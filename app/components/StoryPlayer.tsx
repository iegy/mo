"use client";

import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MoAudioEngine } from "../lib/audio-engine";
import { artFiles, chapterTitle, copy, Language, scenes, uiCopy } from "../lib/story";
import { AudioCue } from "./SceneInteraction";
import { asset, BrokenCorner, MoSprite, PixSprite, SceneArt } from "./SceneAssets";
import StorySceneSection from "./StorySceneSection";

const STORAGE_KEY = "mo-ch01-state-v1";
const SETTINGS_KEY = "mo-settings-v1";
type Quality = "auto" | "balanced" | "lite";

interface SavedState {
  sceneId: string;
  sceneIndex: number;
  pageProgress: number;
  updatedAt: number;
}

interface SettingsState {
  language: Language;
  muted: boolean;
  volume: number;
  reducedMotion: boolean;
  motionOverride: boolean;
  quality: Quality;
}

const defaultSettings: SettingsState = {
  language: "ar",
  muted: true,
  volume: 0.55,
  reducedMotion: false,
  motionOverride: false,
  quality: "auto",
};

export default function StoryPlayer() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const [savedProgress, setSavedProgress] = useState<SavedState | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [autoQuality, setAutoQuality] = useState<Exclude<Quality, "auto">>("balanced");
  const audioRef = useRef<MoAudioEngine | null>(null);
  const rafRef = useRef(0);
  const lastScrollRef = useRef({ y: 0, time: 0 });
  const lastProgressRenderRef = useRef(0);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c = uiCopy[settings.language];

  useEffect(() => {
    audioRef.current = new MoAudioEngine();
    lastScrollRef.current = { y: 0, time: performance.now() };
    const initializationFrame = requestAnimationFrame(() => {
      setAutoQuality(navigator.hardwareConcurrency <= 4 ? "lite" : "balanced");
      try {
        const storedSettings = localStorage.getItem(SETTINGS_KEY);
        const storedProgress = localStorage.getItem(STORAGE_KEY);
        const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (storedSettings) {
          const parsed = JSON.parse(storedSettings) as Partial<SettingsState>;
          setSettings({
            ...defaultSettings,
            ...parsed,
            reducedMotion: parsed.motionOverride ? Boolean(parsed.reducedMotion) : systemReduced,
          });
        } else {
          setSettings((value) => ({ ...value, reducedMotion: systemReduced }));
        }
        if (storedProgress) setSavedProgress(JSON.parse(storedProgress) as SavedState);
      } catch {
        localStorage.removeItem(SETTINGS_KEY);
        localStorage.removeItem(STORAGE_KEY);
      }
      setReady(true);
    });
    return () => cancelAnimationFrame(initializationFrame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.reducedMotion = settings.reducedMotion ? "true" : "false";
    document.documentElement.dataset.quality = settings.quality;
    audioRef.current?.setMuted(settings.muted);
    audioRef.current?.setVolume(settings.volume);
  }, [ready, settings]);

  useEffect(() => {
    const sceneElements = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-index]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.sceneIndex ?? 0);
        setActiveIndex(index);
        const nextScene = scenes[index + 1];
        if (nextScene) {
          const preload = new Image();
          preload.decoding = "async";
          preload.src = asset(`/assets/art/${artFiles[nextScene.art]}.webp`);
        }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: [0.08, 0.25, 0.55] },
    );
    sceneElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    audioRef.current?.setMood(scenes[activeIndex]?.mood ?? "calm");
    if (!ready) return;
    const state: SavedState = {
      sceneId: scenes[activeIndex]?.id ?? scenes[0].id,
      sceneIndex: activeIndex,
      pageProgress,
      updatedAt: Date.now(),
    };
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSavedProgress((previous) => previous?.sceneIndex === activeIndex ? previous : state);
    }, 350);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [activeIndex, pageProgress, ready]);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const now = performance.now();
      if (now - lastProgressRenderRef.current > 100) {
        setPageProgress(Math.round(Math.max(0, Math.min(1, window.scrollY / maxScroll)) * 1000) / 10);
        lastProgressRenderRef.current = now;
      }
      const active = document.querySelector<HTMLElement>(`.story-scene[data-scene-index="${activeIndex}"]`);
      if (active) {
        const rect = active.getBoundingClientRect();
        const available = Math.max(1, active.offsetHeight - window.innerHeight);
        const sceneProgress = Math.max(0, Math.min(1, -rect.top / available));
        const last = lastScrollRef.current;
        const velocity = Math.min(2.2, Math.abs(window.scrollY - last.y) / Math.max(16, now - last.time));
        active.style.setProperty("--scene-progress", sceneProgress.toFixed(4));
        active.style.setProperty("--scene-progress-pct", `${(sceneProgress * 100).toFixed(2)}%`);
        active.style.setProperty("--scene-shift", `${(sceneProgress * 48).toFixed(2)}vw`);
        active.style.setProperty("--scene-rotate", `${(-18 + sceneProgress * 34).toFixed(2)}deg`);
        active.style.setProperty("--scroll-velocity", velocity.toFixed(3));
        lastScrollRef.current = { y: window.scrollY, time: now };
      }
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex]);

  const cue = useCallback((kind: AudioCue) => audioRef.current?.cue(kind), []);
  const toggleSound = useCallback(async () => {
    const nextMuted = !settings.muted;
    if (!nextMuted) await audioRef.current?.unlock();
    setSettings((value) => ({ ...value, muted: nextMuted }));
  }, [settings.muted]);
  const scrollToScene = useCallback((index: number) => {
    document.getElementById(scenes[index]?.id ?? scenes[0].id)?.scrollIntoView({
      behavior: settings.reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [settings.reducedMotion]);
  const effectiveQuality = useMemo(() => {
    if (settings.quality !== "auto") return settings.quality;
    return autoQuality;
  }, [autoQuality, settings.quality]);

  return (
    <main className="story-player" data-language={settings.language} data-quality={effectiveQuality} data-build="MO-1.0.0-IEGY" data-project="MO-IEGY-01">
      <a className="skip-link" href={`#${scenes[0].id}`}>{settings.language === "ar" ? "اذهب إلى الفصل" : "Skip to chapter"}</a>
      <header className="story-toolbar">
        <a className="mini-brand" href="#top" aria-label={c.series}><b>MO</b><span>{settings.language === "ar" ? "خارج الإطار" : "Beyond the Frame"}</span></a>
        <div className="chapter-meter" aria-label={`${c.progress}: ${pageProgress}%`}><span style={{ width: `${pageProgress}%` }} /></div>
        <div className="toolbar-actions">
          <button onClick={() => setSettings((value) => ({ ...value, language: value.language === "ar" ? "en" : "ar" }))} aria-label="Switch language">{settings.language === "ar" ? "EN" : "ع"}</button>
          <button onClick={toggleSound} aria-label={settings.muted ? c.soundOff : c.soundOn}><span aria-hidden="true">{settings.muted ? "◌" : "◉"}</span></button>
          <button onClick={() => setSettingsOpen(true)} aria-label={c.settings}>•••</button>
        </div>
      </header>

      <section id="top" className="chapter-hero">
        <div className="hero-art" aria-hidden="true"><SceneArt file="city-workshop" shouldLoad alt="" /><div className="hero-shade" /><MoSprite pose="idle" /></div>
        <div className="hero-copy">
          <p>{c.chapter}</p><h1>{copy(chapterTitle, settings.language)}</h1><span>{c.series}</span>
          <div className="hero-actions">
            {savedProgress && savedProgress.sceneIndex > 0 ? <button className="primary-button" onClick={() => scrollToScene(savedProgress.sceneIndex)}>{c.continue}</button> : null}
            <button className={savedProgress?.sceneIndex ? "secondary-button" : "primary-button"} onClick={() => scrollToScene(0)}>{savedProgress?.sceneIndex ? c.restart : c.start}</button>
          </div>
          <small>{c.scroll}</small>
        </div>
        <BrokenCorner />
      </section>

      <nav className="scene-rail" aria-label={c.progress}>
        {scenes.map((scene, index) => <button key={scene.id} className={activeIndex === index ? "is-active" : ""} onClick={() => scrollToScene(index)} aria-label={`${scene.number}. ${copy(scene.title, settings.language)}`}><span>{String(scene.number).padStart(2, "0")}</span></button>)}
      </nav>

      <div className="chapter-scenes">
        {scenes.map((scene, index) => <StorySceneSection key={scene.id} scene={scene} index={index} language={settings.language} activeIndex={activeIndex} reducedMotion={settings.reducedMotion} cue={cue} />)}
      </div>

      <section className="epilogue" id="chapter-ending">
        <SceneArt file="escape-finale" shouldLoad={activeIndex >= 10} alt="" /><div className="epilogue-shade" />
        <div className="epilogue-characters"><MoSprite pose="land" /><PixSprite pose="hover" /></div>
        <div className="epilogue-copy"><p>{c.city}</p><h2>{c.complete}</h2><span>{c.ending}</span></div><div className="tiny-blank" aria-hidden="true" />
      </section>

      <section className="chapter-teaser">
        <div className="train" aria-hidden="true"><span /><span /><span /></div><p>{c.next}</p><h2>{c.teaser}</h2><span>{c.teaserLine}</span><button disabled>{c.unavailable}</button>
      </section>

      <footer className="site-footer">
        <div><b>MO</b><span>MO-IEGY-01 · MH-4047 · MO-1.0.0-IEGY</span></div>
        <a href="https://iegy.net" target="_blank" rel="noreferrer">{c.credit}</a><small>{c.rights}</small>
      </footer>

      {settingsOpen ? (
        <div className="settings-backdrop" role="presentation" onMouseDown={(event: ReactMouseEvent) => event.target === event.currentTarget && setSettingsOpen(false)}>
          <section className="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-title">
            <button className="dialog-close" onClick={() => setSettingsOpen(false)} aria-label={c.close}>×</button><h2 id="settings-title">{c.settings}</h2>
            <label><span>{c.motion}</span><select value={settings.reducedMotion ? "reduced" : "full"} onChange={(event) => setSettings((value) => ({ ...value, reducedMotion: event.target.value === "reduced", motionOverride: true }))}><option value="full">{c.fullMotion}</option><option value="reduced">{c.reducedMotion}</option></select></label>
            <label><span>{c.quality}</span><select value={settings.quality} onChange={(event) => setSettings((value) => ({ ...value, quality: event.target.value as Quality }))}><option value="auto">{c.auto}</option><option value="balanced">{c.balanced}</option><option value="lite">{c.lite}</option></select></label>
            <label><span>{settings.muted ? c.soundOff : c.soundOn}</span><input type="range" min="0" max="1" step="0.05" value={settings.volume} onChange={(event) => setSettings((value) => ({ ...value, volume: Number(event.target.value) }))} disabled={settings.muted} /></label>
          </section>
        </div>
      ) : null}
    </main>
  );
}
