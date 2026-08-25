"use client";

import { CSSProperties } from "react";
import { artFiles, copy, Language, StoryScene } from "../lib/story";
import SceneInteraction, { AudioCue } from "./SceneInteraction";
import { BrokenCorner, MoSprite, PixSprite, SceneArt } from "./SceneAssets";

export default function StorySceneSection({
  scene,
  index,
  language,
  activeIndex,
  reducedMotion,
  cue,
}: {
  scene: StoryScene;
  index: number;
  language: Language;
  activeIndex: number;
  reducedMotion: boolean;
  cue: (kind: AudioCue) => void;
}) {
  const shouldLoad = Math.abs(index - activeIndex) <= 1;
  const artFile = artFiles[scene.art];
  return (
    <section
      id={scene.id}
      className={`story-scene mood-${scene.mood} art-${scene.art}${activeIndex === index ? " is-active" : ""}`}
      data-scene-index={index}
      data-scene-id={scene.id}
      style={{ "--scene-height": `${reducedMotion ? Math.min(scene.scrollVh, 150) : scene.scrollVh}vh` } as CSSProperties}
      aria-labelledby={`${scene.id}-title`}
    >
      <div className="scene-sticky">
        <div className="comic-panel">
          <SceneArt file={artFile} shouldLoad={shouldLoad} alt="" />
          <div className="scene-wash" aria-hidden="true" />
          <div className="scene-number" aria-hidden="true">{String(scene.number).padStart(2, "0")}</div>
          <MoSprite pose={scene.moPose} reactive={scene.interaction === "look"} />
          <PixSprite pose={scene.pixPose} />
          <SceneInteraction scene={scene} language={language} cue={cue} />
          {scene.number === 3 || scene.number === 7 ? <BrokenCorner /> : null}
          {scene.number === 8 ? (
            <button className="alternate-mo" aria-label={language === "ar" ? "ظل مو بعيد" : "A distant Mo silhouette"}>MO?</button>
          ) : null}
          {scene.number >= 10 ? <div className="blank-effect" aria-hidden="true" /> : null}
          {scene.number === 7 ? <div className="frame-tear" aria-hidden="true" /> : null}
          {scene.number === 12 ? <div className="escape-lines" aria-hidden="true" /> : null}
        </div>

        <article className="scene-copy">
          <p className="scene-kicker">{copy(scene.kicker, language)}</p>
          <h2 id={`${scene.id}-title`}>{copy(scene.title, language)}</h2>
          <p>{copy(scene.narration, language)}</p>
          {scene.hint ? <small>{copy(scene.hint, language)}</small> : null}
        </article>
      </div>
    </section>
  );
}
