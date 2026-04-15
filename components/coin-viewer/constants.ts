import type { Language, PresetName } from "./copy";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const MODEL_URL = `${BASE_PATH}/carthaginian-shekel.glb`;

export const INITIAL_ROTATION: [number, number, number] = [0.03, -0.22, 0];

export const KEYBOARD_ROTATION_STEP = {
  x: 0.12,
  y: 0.08,
} as const;

export const KEYBOARD_ZOOM_STEP = 0.12;

export const PRESET_OPTIONS: PresetName[] = ["museum", "gallery"];

export const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "pl", label: "PL" },
  { value: "fr", label: "FR" },
];

export function getResponsiveDistanceMultiplier(width: number) {
  if (width < 420) return 1.62;
  if (width < 640) return 1.5;
  if (width < 900) return 1.4;
  if (width < 1280) return 1.32;
  return 1.24;
}

export type PresetBackground = {
  canvas: string;
  overlay: string;
  vignette: string;
};

export const PRESET_BACKGROUNDS: Record<PresetName, PresetBackground> = {
  museum: {
    canvas: "#08090c",
    overlay:
      "radial-gradient(circle at 38% 20%, rgba(255,232,188,0.055) 0%, transparent 24%), radial-gradient(circle at 52% 44%, rgba(255,255,255,0.02) 0%, transparent 34%), linear-gradient(180deg, rgba(10,12,16,0.98) 0%, rgba(6,7,10,1) 100%)",
    vignette:
      "radial-gradient(circle at 50% 50%, transparent 54%, rgba(0,0,0,0.56) 100%)",
  },
  gallery: {
    canvas: "#0b0c0f",
    overlay:
      "radial-gradient(circle at 42% 18%, rgba(255,255,255,0.04) 0%, transparent 22%), radial-gradient(circle at 56% 46%, rgba(255,255,255,0.018) 0%, transparent 32%), linear-gradient(180deg, rgba(10,11,14,0.98) 0%, rgba(8,9,12,1) 100%)",
    vignette:
      "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.46) 100%)",
  },
};

export type UiBorder = {
  soft: string;
  strong: string;
  hover: string;
  bg: string;
  bgSoft: string;
};

export const UI_BORDER: Record<PresetName, UiBorder> = {
  museum: {
    soft: "border-[#cfb67a]/20",
    strong: "border-[#e2cb8f]/34",
    hover: "hover:border-[#f0dba4]/44",
    bg: "bg-[#16120d]/70",
    bgSoft: "bg-[#1b1610]/55",
  },
  gallery: {
    soft: "border-[#8e877d]/14",
    strong: "border-[#c1b8aa]/22",
    hover: "hover:border-[#d6ccbc]/28",
    bg: "bg-[#141517]/70",
    bgSoft: "bg-[#18191c]/56",
  },
};

export const PRESETS: Record<
  PresetName,
  {
    environmentIntensity: number;
    exposure: number;
    shadowBlur: number;
    shadowOpacity: number;
  }
> = {
  museum: {
    environmentIntensity: 0.22,
    exposure: 0.9,
    shadowBlur: 2.2,
    shadowOpacity: 0.08,
  },
  gallery: {
    environmentIntensity: 0.32,
    exposure: 1.1,
    shadowBlur: 3.6,
    shadowOpacity: 0.12,
  },
};
