"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./CoinExhibitViewer.module.css";
import CoinScene from "./CoinScene";
import { UI_BORDER } from "./constants";
import { COPY, type Language, type PresetName } from "./copy";
import DesktopInfoPanel from "./DesktopInfoPanel";
import TopControls from "./TopControls";

const INTERACTIVE_TARGET_SELECTOR =
  'button, a, input, textarea, select, [contenteditable], [role="button"], [role="link"]';

export default function CoinExhibitViewer() {
  const prefersReducedMotion = useReducedMotion();
  const [lang, setLang] = useState<Language>("en");
  const [autoRotateOverride, setAutoRotateOverride] = useState<boolean | null>(null);
  const [preset, setPreset] = useState<PresetName>("museum");
  const [displayPreset, setDisplayPreset] = useState<PresetName>("museum");
  const [nextPreset, setNextPreset] = useState<PresetName | null>(null);
  const [isPresetTransitioning, setIsPresetTransitioning] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const presetTimeoutRef = useRef<number | null>(null);

  const copy = COPY[lang];
  const ui = UI_BORDER[preset];
  const autoRotate = autoRotateOverride ?? !prefersReducedMotion;

  const toggleAutoRotate = useCallback(() => {
    setAutoRotateOverride((value) => !(value ?? !prefersReducedMotion));
  }, [prefersReducedMotion]);

  const changePreset = useCallback(
    (targetPreset: PresetName) => {
      if (targetPreset === preset) return;

      if (presetTimeoutRef.current !== null) {
        window.clearTimeout(presetTimeoutRef.current);
      }

      setIsPresetTransitioning(true);
      setNextPreset(targetPreset);

      presetTimeoutRef.current = window.setTimeout(() => {
        setPreset(targetPreset);
        setDisplayPreset(targetPreset);
        setNextPreset(null);
        setIsPresetTransitioning(false);
        presetTimeoutRef.current = null;
      }, 260);
    },
    [preset],
  );

  useEffect(() => {
    return () => {
      if (presetTimeoutRef.current !== null) {
        window.clearTimeout(presetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest(INTERACTIVE_TARGET_SELECTOR)) {
        return;
      }

      if (event.key === "1") changePreset("museum");
      if (event.key === "2") changePreset("gallery");

      if (event.key.toLowerCase() === "r") {
        setResetSignal((value) => value + 1);
      }

      if (event.key.toLowerCase() === "a") {
        toggleAutoRotate();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changePreset, toggleAutoRotate]);

  return (
    <div className={styles.viewerRoot}>
      <div className={styles.viewerFrame}>
        <TopControls
          autoRotate={autoRotate}
          copy={copy}
          isMobileInfoOpen={isMobileInfoOpen}
          onChangePreset={changePreset}
          onReset={() => setResetSignal((value) => value + 1)}
          onToggleAutoRotate={toggleAutoRotate}
          onToggleMobileInfo={() => setIsMobileInfoOpen((value) => !value)}
          preset={preset}
          ui={ui}
        />

        <div className="flex flex-1 items-center justify-center py-3">
          <div className={styles.coinShell}>
            <div className={styles.coinStage}>
              <CoinScene
                autoRotate={autoRotate}
                copy={copy}
                displayPreset={displayPreset}
                isMobileInfoOpen={isMobileInfoOpen}
                isPresetTransitioning={isPresetTransitioning}
                lang={lang}
                nextPreset={nextPreset}
                onLanguageChange={setLang}
                preset={preset}
                resetSignal={resetSignal}
                ui={ui}
              />
              <DesktopInfoPanel
                copy={copy}
                lang={lang}
                onLanguageChange={setLang}
                preset={preset}
                ui={ui}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
