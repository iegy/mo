"use client";

import { CSSProperties, useEffect, useState } from "react";
import { StoryScene } from "../lib/story";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

function useLazySceneArt(file: string, active: boolean) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active || ready) return;
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.src = asset(`/assets/art/${file}.webp`);
    img.onload = () => !cancelled && setReady(true);
    img.onerror = () => !cancelled && setReady(true);
    return () => {
      cancelled = true;
    };
  }, [active, file, ready]);
  return ready;
}

export function SceneArt({ file, shouldLoad, alt }: { file: string; shouldLoad: boolean; alt: string }) {
  const ready = useLazySceneArt(file, shouldLoad);
  if (!ready) return <div className="art-placeholder" aria-hidden="true" />;
  return (
    <picture className="scene-picture">
      <source srcSet={asset(`/assets/art/${file}.avif`)} type="image/avif" />
      <source srcSet={asset(`/assets/art/${file}.webp`)} type="image/webp" />
      <img
        src={asset(`/assets/art/${file}.jpg`)}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

export function MoSprite({ pose, reactive = false }: { pose: StoryScene["moPose"]; reactive?: boolean }) {
  return (
    <div
      className={`mo-sprite pose-${pose}${reactive ? " is-reactive" : ""}`}
      style={{ "--mo-sprite": `url(${asset("/assets/characters/mo-action-sprite-v1.webp")})` } as CSSProperties}
      role="img"
      aria-label="Mo"
    >
      <span className="screen-expression" aria-hidden="true" />
    </div>
  );
}

export function PixSprite({ pose }: { pose: StoryScene["pixPose"] }) {
  if (pose === "none") return null;
  return (
    <div
      className={`pix-sprite pose-${pose}`}
      style={{ "--pix-sprite": `url(${asset("/assets/characters/pix-state-sprite-v1.webp")})` } as CSSProperties}
      role="img"
      aria-label="PIX"
    />
  );
}

export function BrokenCorner() {
  return <span className="broken-corner" aria-label="Broken Corner Mark" />;
}
