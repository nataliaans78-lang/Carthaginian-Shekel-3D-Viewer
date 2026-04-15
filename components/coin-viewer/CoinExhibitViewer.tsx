"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CoinExhibitViewer.module.css";
import CoinScene from "./CoinScene";
import { UI_BORDER } from "./constants";
import { COPY, type Language, type PresetName } from "./copy";
import DesktopInfoPanel from "./DesktopInfoPanel";
import TopControls from "./TopControls";

export default function CoinExhibitViewer() {
  const [lang, setLang] = useState<Language>("en");
  const [autoRotate, setAutoRotate] = useState(true);
  const [preset, setPreset] = useState<PresetName>("museum");
  const [displayPreset, setDisplayPreset] = useState<PresetName>("museum");
  const [nextPreset, setNextPreset] = useState<PresetName | null>(null);
  const [isPresetTransitioning, setIsPresetTransitioning] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const presetTimeoutRef = useRef<number | null>(null);

  const copy = COPY[lang];
  const ui = UI_BORDER[preset];

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
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      if (event.key === "1") changePreset("museum");
      if (event.key === "2") changePreset("gallery");

      if (event.key === "0") {
        event.preventDefault();
        setResetSignal((value) => value + 1);
      }

      if (event.code === "Space") {
        event.preventDefault();
        setAutoRotate((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changePreset]);

  return (
    <div className={styles.viewerRoot}>
      <div className={styles.viewerFrame}>
        <TopControls
          autoRotate={autoRotate}
          copy={copy}
          onChangePreset={changePreset}
          onReset={() => setResetSignal((value) => value + 1)}
          onToggleAutoRotate={() => setAutoRotate((value) => !value)}
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
