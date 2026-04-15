"use client";

import { motion } from "framer-motion";
import { BadgeInfo, Clock3, Download, Landmark, Shield } from "lucide-react";
import styles from "./CoinExhibitViewer.module.css";
import { LANGUAGE_OPTIONS, MODEL_URL, type UiBorder } from "./constants";
import type { CopyShape, Language, PresetName } from "./copy";

type DesktopInfoPanelProps = {
  copy: CopyShape;
  lang: Language;
  onLanguageChange: (language: Language) => void;
  preset: PresetName;
  ui: UiBorder;
};

export default function DesktopInfoPanel({
  copy,
  lang,
  onLanguageChange,
  preset,
  ui,
}: DesktopInfoPanelProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`${styles.coinPanel} ${styles.desktopPanel} relative self-center overflow-hidden rounded-[24px] border shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl ${
        preset === "museum" ? "border-[#bfa06a]/18" : "border-[#8f96a1]/16"
      } bg-[linear-gradient(180deg,rgba(14,17,22,0.88),rgba(8,10,14,0.96))]`}
    >
      <div
        className={`absolute inset-0 ${
          preset === "museum"
            ? "bg-[radial-gradient(circle_at_top_left,rgba(191,160,106,0.07),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,245,218,0.02),transparent_24%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_top_right,rgba(140,148,162,0.05),transparent_24%)]"
        }`}
      />
      <motion.div
        key={lang}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        className={`${styles.coinPanelInner} relative z-10`}
      >
        <div>
          <div className={styles.coinPanelHeader}>
            <div>
              <div
                className={`${styles.coinPanelBadge} inline-flex items-center rounded-full border ${ui.soft} ${ui.bgSoft}`}
              >
                <Landmark className="h-3.5 w-3.5 text-white/42" />
                <span>{copy.artifactLabel}</span>
              </div>
              <h1 className={`${styles.coinPanelTitle} font-semibold tracking-tight text-white`}>
                {copy.title}
              </h1>
            </div>
            <div
              className={`${styles.coinLangSwitcher} inline-flex flex-nowrap items-center rounded-full border ${ui.soft} ${ui.bgSoft}`}
            >
              {LANGUAGE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onLanguageChange(value)}
                  className={`cursor-pointer whitespace-nowrap rounded-full transition ${
                    lang === value
                      ? `${ui.strong} bg-white text-black`
                      : `text-white/70 hover:bg-white/8 ${ui.hover}`
                  } ${styles.coinLangButton}`}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className={`${styles.coinPanelMeta} space-y-2`}>
            <div className="group flex items-center gap-2.5 leading-none text-white/72 transition hover:text-white/90">
              <Clock3 className="h-4 w-4 shrink-0 text-white/40 group-hover:text-white/70" />
              <span>{copy.period}</span>
            </div>
            <div className="group flex items-center gap-2.5 leading-none text-white/72 transition hover:text-white/90">
              <BadgeInfo className="h-4 w-4 shrink-0 text-white/40 group-hover:text-white/70" />
              <span>{copy.obverse}</span>
            </div>
            <div className="group flex items-center gap-2.5 leading-none text-white/72 transition hover:text-white/90">
              <Shield className="h-4 w-4 shrink-0 text-white/40 group-hover:text-white/70" />
              <span>{copy.reverse}</span>
            </div>
          </div>
          <div className={`${styles.coinPanelBody} text-white/86`}>
            <p>{copy.body1}</p>
            <p>{copy.body2}</p>
          </div>
        </div>
        <div className={styles.coinPanelActions}>
          <a
            href={MODEL_URL}
            download
            className={`${styles.coinPanelButton} inline-flex items-center gap-3 rounded-full border font-medium text-white transition hover:bg-white/12 ${ui.soft} bg-white/8`}
          >
            <Download className="h-4 w-4" />
            {copy.download}
          </a>
        </div>
      </motion.div>
    </motion.aside>
  );
}
