"use client";

import { motion } from "framer-motion";
import { BadgeInfo, Clock3, Download, Landmark, Shield } from "lucide-react";
import styles from "./CoinExhibitViewer.module.css";
import { LANGUAGE_OPTIONS, MODEL_URL, type UiBorder } from "./constants";
import type { CopyShape, Language, PresetName } from "./copy";

type MobileInfoPanelProps = {
  copy: CopyShape;
  isOpen: boolean;
  lang: Language;
  onLanguageChange: (language: Language) => void;
  preset: PresetName;
  ui: UiBorder;
};

export default function MobileInfoPanel({
  copy,
  isOpen,
  lang,
  onLanguageChange,
  preset,
  ui,
}: MobileInfoPanelProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -12,
      }}
      transition={{ duration: 0.22 }}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      className={`${styles.mobileInfoPanel} absolute left-3 right-3 top-1/2 z-20 -translate-y-1/2 rounded-[22px] border backdrop-blur-xl ${
        preset === "museum" ? "border-[#bfa06a]/18" : "border-[#8f96a1]/16"
      } bg-[linear-gradient(180deg,rgba(14,17,22,0.92),rgba(8,10,14,0.97))]`}
    >
      <div className="relative max-h-[calc(100svh-170px)] overflow-y-auto p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${ui.soft} ${ui.bgSoft}`}
            >
              <Landmark className="mr-1.5 h-3.5 w-3.5 text-white/42" />
              {copy.artifactLabel}
            </div>
            <h2 className="mt-2 text-[24px] font-semibold leading-none text-white">
              {copy.title}
            </h2>
          </div>

          <div
            className={`inline-flex items-center rounded-full border ${ui.soft} ${ui.bgSoft}`}
          >
            {LANGUAGE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onLanguageChange(value)}
                className={`rounded-full px-2 py-1 text-[10px] transition ${
                  lang === value
                    ? `${ui.strong} bg-white text-black`
                    : `text-white/70 hover:bg-white/8 ${ui.hover}`
                }`}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-[12px] text-white/76">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 shrink-0 text-white/40" />
            <span>{copy.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeInfo className="h-4 w-4 shrink-0 text-white/40" />
            <span>{copy.obverse}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 shrink-0 text-white/40" />
            <span>{copy.reverse}</span>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-[12px] leading-[1.5] text-white/84">
          <p>{copy.body1}</p>
          <p>{copy.body2}</p>
        </div>

        <div className="mt-4">
          <a
            href={MODEL_URL}
            download
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-medium text-white transition hover:bg-white/12 ${ui.soft} bg-white/8`}
          >
            <Download className="h-4 w-4" />
            {copy.download}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
