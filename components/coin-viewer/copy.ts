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
    title: "Carthaginian Coin",
    period: "Ancient Carthage",
    obverse: "Tanit",
    reverse: "Standing horse",
    body1:
      "A Carthaginian electrum coin depicting Tanit and a standing horse.",
    body2:
      "The model is a digital visualization based on the cited source material.",
    download: "Download 3D model (.glb)",
    hint: "Drag to rotate",
    info: "Info",
    modelName: "Carthaginian coin (3D visualization)",
    mobileModelName: "Carthaginian coin (3D visualization)",
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
    title: "Moneta kartagińska",
    period: "Starożytna Kartagina",
    obverse: "Awers: Tanit",
    reverse: "Rewers: stojący koń",
    body1:
      "Kartagińska moneta z elektronu przedstawiająca Tanit i stojącego konia.",
    body2:
      "Model jest cyfrową wizualizacją opartą na wskazanym materiale źródłowym.",
    download: "Pobierz model 3D (.glb)",
    hint: "Przeciągnij, aby obracać",
    info: "Info",
    modelName: "Moneta kartagińska (wizualizacja 3D)",
    mobileModelName: "Moneta kartagińska (wizualizacja 3D)",
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
    title: "Monnaie carthaginoise",
    period: "Carthage antique",
    obverse: "Avers : Tanit",
    reverse: "Revers : cheval debout",
    body1:
      "Une monnaie carthaginoise en électrum représentant Tanit et un cheval debout.",
    body2:
      "Le modèle est une visualisation numérique fondée sur le document source indiqué.",
    download: "Télécharger le modèle 3D (.glb)",
    hint: "Glissez pour faire pivoter",
    info: "Info",
    modelName: "Monnaie carthaginoise (visualisation 3D)",
    mobileModelName: "Monnaie carthaginoise (visualisation 3D)",
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
