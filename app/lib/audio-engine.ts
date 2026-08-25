/* MO Story Engine audio · MO-IEGY-01 · Mohamed Hussein · iegy.net */

type SceneMood = "calm" | "playful" | "mystery" | "wonder" | "fear" | "action";

export class MoAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambient: GainNode | null = null;
  private drone: OscillatorNode | null = null;
  private volume = 0.55;
  private muted = true;

  async unlock() {
    if (typeof window === "undefined") return;
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.ambient = this.context.createGain();
      this.drone = this.context.createOscillator();
      const filter = this.context.createBiquadFilter();
      this.drone.type = "sine";
      this.drone.frequency.value = 88;
      filter.type = "lowpass";
      filter.frequency.value = 420;
      this.ambient.gain.value = 0.035;
      this.master.gain.value = 0;
      this.drone.connect(filter).connect(this.ambient).connect(this.master);
      this.master.connect(this.context.destination);
      this.drone.start();
    }
    if (this.context.state === "suspended") await this.context.resume();
    this.applyVolume();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.applyVolume();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.applyVolume();
  }

  private applyVolume() {
    if (!this.master || !this.context) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.linearRampToValueAtTime(this.muted ? 0 : this.volume, this.context.currentTime + 0.08);
  }

  setMood(mood: SceneMood) {
    if (!this.context || !this.drone || !this.ambient) return;
    const now = this.context.currentTime;
    const frequency: Record<SceneMood, number> = {
      calm: 88,
      playful: 110,
      mystery: 73.4,
      wonder: 130.8,
      fear: 55,
      action: 146.8,
    };
    this.drone.frequency.cancelScheduledValues(now);
    this.drone.frequency.exponentialRampToValueAtTime(frequency[mood], now + 0.8);
    this.ambient.gain.cancelScheduledValues(now);
    this.ambient.gain.linearRampToValueAtTime(mood === "fear" ? 0.008 : 0.035, now + 0.6);
  }

  cue(kind: "mo" | "pix" | "error" | "impact" | "success" | "door") {
    if (!this.context || !this.master || this.muted) return;
    const now = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const values = {
      mo: [220, 320, 0.08],
      pix: [720, 1040, 0.12],
      error: [170, 105, 0.18],
      impact: [95, 48, 0.24],
      success: [392, 660, 0.22],
      door: [130, 82, 0.28],
    }[kind];
    osc.type = kind === "pix" ? "sine" : "triangle";
    osc.frequency.setValueAtTime(values[0], now);
    osc.frequency.exponentialRampToValueAtTime(values[1], now + values[2]);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + values[2]);
    osc.connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + values[2] + 0.02);
  }
}
