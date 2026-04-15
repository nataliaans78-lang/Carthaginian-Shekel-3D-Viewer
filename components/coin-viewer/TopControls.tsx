"use client";

import { BadgeInfo, RefreshCw, RotateCcw } from "lucide-react";
import styles from "./CoinExhibitViewer.module.css";
import { PRESET_OPTIONS, type UiBorder } from "./constants";
import type { CopyShape, PresetName } from "./copy";

type TopControlsProps = {
  autoRotate: boolean;
  copy: CopyShape;
  onChangePreset: (preset: PresetName) => void;
  onReset: () => void;
  onToggleAutoRotate: () => void;
  onToggleMobileInfo: () => void;
  preset: PresetName;
  ui: UiBorder;
};

const controlButtonClass =
  "inline-flex shrink-0 items-center gap-[clamp(6px,0.65vw,8px)] whitespace-nowrap rounded-full border px-[clamp(11px,1.05vw,14px)] py-[clamp(5px,0.55vw,6px)] text-[clamp(11px,0.88vw,13px)] leading-none transition hover:bg-white/8";

export default function TopControls({
  autoRotate,
  copy,
  onChangePreset,
  onReset,
  onToggleAutoRotate,
  onToggleMobileInfo,
  preset,
  ui,
}: TopControlsProps) {
  return (
    <div
      className={`${styles.topControls} flex shrink-0 flex-wrap items-center justify-start gap-[clamp(8px,0.9vw,14px)] py-3 text-[clamp(11px,0.92vw,14px)] text-white/85`}
    >
      <div
        className={`${styles.topControlsGroup} flex min-w-0 flex-nowrap items-center gap-[clamp(6px,0.7vw,10px)] text-white/80`}
      >
        <span className="shrink-0 whitespace-nowrap">{copy.presetLabel}</span>
        <div
          className={`flex shrink-0 items-center gap-1 rounded-full border ${ui.soft} ${ui.bgSoft} px-0.5 py-0.5`}
        >
          {PRESET_OPTIONS.map((value) => (
            <button
              key={value}
              onClick={() => onChangePreset(value)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-[clamp(8px,0.85vw,10px)] py-[clamp(3px,0.45vw,4px)] text-[clamp(10px,0.78vw,11px)] font-semibold transition ${
                preset === value
                  ? `${ui.strong} bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]`
                  : `text-white/70 hover:bg-white/8 ${ui.hover}`
              }`}
              title={copy.presetHint}
              type="button"
            >
              {value === "museum" ? copy.presetMuseum : copy.presetGallery}
            </button>
          ))}
        </div>
        <span
          className={`${styles.topControlsHint} min-w-0 max-w-[clamp(90px,14vw,170px)] truncate text-[clamp(9px,0.72vw,12px)] text-white/60`}
        >
          {copy.presetHint}
        </span>
      </div>

      <button
        onClick={onReset}
        className={`${controlButtonClass} ${ui.soft} ${ui.bgSoft} ${ui.hover}`}
        type="button"
      >
        <RotateCcw className="h-[clamp(13px,0.98vw,16px)] w-[clamp(13px,0.98vw,16px)]" />
        <span className="truncate">{copy.reset}</span>
      </button>

      <button
        onClick={onToggleAutoRotate}
        className={`${controlButtonClass} min-w-0 shrink max-w-[clamp(118px,16vw,170px)] ${ui.soft} ${ui.bgSoft} ${ui.hover}`}
        type="button"
      >
        <RefreshCw
          className={`h-[clamp(13px,0.98vw,16px)] w-[clamp(13px,0.98vw,16px)] shrink-0 ${
            autoRotate ? "animate-spin" : ""
          }`}
        />
        <span className="truncate">
          {autoRotate ? copy.autoRotateOn : copy.autoRotateOff}
        </span>
      </button>

      <button
        onClick={onToggleMobileInfo}
        className={`${styles.mobileInfoToggle} ${controlButtonClass} ${ui.soft} ${ui.bgSoft} ${ui.hover}`}
        type="button"
      >
        <BadgeInfo className="h-[clamp(13px,0.98vw,16px)] w-[clamp(13px,0.98vw,16px)]" />
        {copy.info}
      </button>
    </div>
  );
}
