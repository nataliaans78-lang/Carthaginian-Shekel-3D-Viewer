export type Language = "en" | "pl" | "fr";
export type PresetName = "museum" | "gallery";

export type CopyShape = {
  title: string;
  period: string;
  obverse: string;
  reverse: string;
  body1: string;
  body2: string;
  download: string;
  hint: string;
  info: string;
  modelName: string;
  mobileModelName: string;
  mobileHint: string;
  reset: string;
  autoRotateOn: string;
  autoRotateOff: string;
  presetLabel: string;
  presetMuseum: string;
  presetGallery: string;
  presetHint: string;
  controlsHint: string;
  artifactLabel: string;
};

export const COPY: Record<Language, CopyShape> = {
  en: {
    title: "Carthaginian Electrum Stater",
    period: "Circa 310–290 BCE",
    obverse: "Obverse: Tanit",
    reverse: "Reverse: standing horse",
    body1:
      "This Carthaginian electrum stater depicts Tanit on the obverse and a standing horse on the reverse.",
    body2:
      "Digital 3D visualization based on the cited source image.",
    download: "Download 3D model (.glb)",
    hint: "Drag to rotate",
    info: "Info",
    modelName: "Carthaginian electrum stater (3D visualization)",
    mobileModelName: "Carthaginian electrum stater (3D visualization)",
    mobileHint: "Swipe to rotate",
    reset: "Reset view",
    autoRotateOn: "Auto-rotate: On",
    autoRotateOff: "Auto-rotate: Off",
    presetLabel: "Lighting mode",
    presetMuseum: "Museum",
    presetGallery: "Gallery",
    presetHint: "1 = museum, 2 = gallery",
    controlsHint: "LMB: rotate | Wheel: zoom | RMB: pan",
    artifactLabel: "Artifact",
  },
  pl: {
    title: "Kartagiński stater z elektronu",
    period: "Około 310–290 p.n.e.",
    obverse: "Awers: Tanit",
    reverse: "Rewers: stojący koń",
    body1:
      "Ten kartagiński stater z elektronu przedstawia Tanit na awersie i stojącego konia na rewersie.",
    body2:
      "Cyfrowa wizualizacja 3D oparta na wskazanej fotografii źródłowej.",
    download: "Pobierz model 3D (.glb)",
    hint: "Przeciągnij, aby obracać",
    info: "Info",
    modelName: "Kartagiński stater z elektronu (wizualizacja 3D)",
    mobileModelName: "Kartagiński stater z elektronu (wizualizacja 3D)",
    mobileHint: "Przesuń, aby obracać",
    reset: "Resetuj widok",
    autoRotateOn: "Autoobrót: włączony",
    autoRotateOff: "Autoobrót: wyłączony",
    presetLabel: "Tryb oświetlenia",
    presetMuseum: "Muzeum",
    presetGallery: "Galeria",
    presetHint: "1 = muzeum, 2 = galeria",
    controlsHint: "LPM: obrót | Kółko: zoom | PPM: przesuwanie",
    artifactLabel: "Artefakt",
  },
  fr: {
    title: "Statère carthaginois en électrum",
    period: "Vers 310–290 av. J.-C.",
    obverse: "Avers : Tanit",
    reverse: "Revers : cheval debout",
    body1:
      "Ce statère carthaginois en électrum représente Tanit à l’avers et un cheval debout au revers.",
    body2:
      "Visualisation 3D numérique fondée sur l’image source créditée.",
    download: "Télécharger le modèle 3D (.glb)",
    hint: "Glissez pour faire pivoter",
    info: "Info",
    modelName: "Statère carthaginois en électrum (visualisation 3D)",
    mobileModelName: "Statère carthaginois en électrum (visualisation 3D)",
    mobileHint: "Glissez pour pivoter",
    reset: "Réinitialiser la vue",
    autoRotateOn: "Rotation automatique : activée",
    autoRotateOff: "Rotation automatique : désactivée",
    presetLabel: "Mode d’éclairage",
    presetMuseum: "Musée",
    presetGallery: "Galerie",
    presetHint: "1 = musée, 2 = galerie",
    controlsHint: "Clic gauche : pivoter | Molette : zoomer | Clic droit : déplacer",
    artifactLabel: "Artefact",
  },
};
