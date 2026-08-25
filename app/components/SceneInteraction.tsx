"use client";

import { CSSProperties, useState } from "react";
import { copy, Language, StoryScene } from "../lib/story";

export type AudioCue = "mo" | "pix" | "error" | "impact" | "success" | "door";

export default function SceneInteraction({
  scene,
  language,
  cue,
}: {
  scene: StoryScene;
  language: Language;
  cue: (kind: AudioCue) => void;
}) {
  const [signTaps, setSignTaps] = useState(0);
  const [cityBits, setCityBits] = useState<string[]>([]);
  const [repair, setRepair] = useState(0);
  const [pixDodges, setPixDodges] = useState(0);
  const [marginReveal, setMarginReveal] = useState<string | null>(null);

  if (!scene.interaction) return null;

  if (scene.interaction === "look") {
    return (
      <button className="scene-hotspot look-hotspot" onClick={() => cue("mo")} aria-label={copy(scene.hint!, language)}>
        <span aria-hidden="true">•</span>
      </button>
    );
  }

  if (scene.interaction === "sign") {
    const text = signTaps >= 3
      ? language === "ar" ? "متأكد؟" : "ARE YOU SURE?"
      : language === "ar" ? "تم اكتشاف خطأ واحد" : "1 ERROR DETECTED";
    return (
      <button
        className={`error-sign${signTaps >= 3 ? " easter-found" : ""}`}
        onClick={() => {
          setSignTaps((value) => Math.min(value + 1, 3));
          cue(signTaps >= 2 ? "success" : "error");
        }}
      >
        <span>{text}</span><small>{signTaps}/3</small>
      </button>
    );
  }

  if (scene.interaction === "city") {
    const options = [
      ["cup", language === "ar" ? "الكوباية نزلت متأخر" : "One cup, slightly late"],
      ["drone", language === "ar" ? "الدرون سلّم" : "The drone waves back"],
      ["box", language === "ar" ? "لسه مقفول" : "Still locked"],
    ];
    return (
      <div className="interaction-row city-interactions">
        {options.map(([key, label], index) => (
          <button
            key={key}
            className={cityBits.includes(key) ? "is-found" : ""}
            onClick={() => {
              setCityBits((items) => [...new Set([...items, key])]);
              cue(index === 1 ? "pix" : "mo");
            }}
          >
            <span aria-hidden="true">{index === 0 ? "◡" : index === 1 ? "◇" : "▣"}</span>
            <small>{label}</small>
          </button>
        ))}
      </div>
    );
  }

  if (scene.interaction === "repair") {
    const worked = repair >= 4;
    return (
      <button
        className={`repair-unit${worked ? " is-working" : ""}`}
        onClick={() => {
          setRepair((value) => Math.min(value + 1, 4));
          cue(repair >= 3 ? "success" : "error");
        }}
        aria-label={copy(scene.hint!, language)}
      >
        <span className="unit-lights" aria-hidden="true"><i /><i /><i /></span>
        <b>{worked ? "✓" : `${repair + 1}`}</b><small>MH-4047</small>
      </button>
    );
  }

  if (scene.interaction === "pix") {
    return (
      <button
        className="pix-catch"
        style={{ "--dodge": pixDodges } as CSSProperties}
        onClick={() => {
          setPixDodges((value) => value + 1);
          cue("pix");
        }}
        aria-label={copy(scene.hint!, language)}
      >✦</button>
    );
  }

  const marginOptions = [
    ["sea", language === "ar" ? "الباب فتح على بحر واقف بالطول" : "The door opens onto a vertical sea"],
    ["future", language === "ar" ? "الشباك بيورّي مدينة لسه مجتش" : "The window shows a city that hasn't happened yet"],
    ["stairs", language === "ar" ? "السلم فعلًا رايح ولا حتة" : "The stairs genuinely lead nowhere"],
    ["01", language === "ar" ? "الباب 01 مش راضي يفتح... وبيكس عارفه" : "Door 01 won't open—and PIX knows it"],
  ];
  return (
    <div className="margin-interactions">
      <div className="margin-buttons">
        {marginOptions.map(([key]) => (
          <button
            key={key}
            className={marginReveal === key ? "is-found" : ""}
            onClick={() => {
              setMarginReveal(key);
              cue(key === "01" ? "error" : "door");
            }}
          >{key === "sea" ? "▯" : key === "future" ? "□" : key === "stairs" ? "⌁" : "01"}</button>
        ))}
      </div>
      <p aria-live="polite">{marginOptions.find(([key]) => key === marginReveal)?.[1]}</p>
    </div>
  );
}
