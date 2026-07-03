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
    title: "Carthaginian Shekel",
    period: "Late 4th–early 3rd century BCE",
    obverse: "Wreathed head of Tanit",
    reverse: "Standing horse",
    body1:
      "This electrum coin from Carthage shows a wreathed head of Tanit on the obverse.",
    body2:
      "The reverse depicts a standing horse, a familiar motif in Carthaginian coinage. This 3D model is a digital visualization based on the credited reference image.",
    download: "Download 3D model (.glb)",
    hint: "Drag to rotate",
    info: "Info",
    modelName: "Carthaginian coin (3D visualization)",
    mobileModelName: "Carthaginian coin (3D visualization)",
    mobileHint: "Swipe to rotate",
    reset: "Reset view",
    autoRotateOn: "Auto-rotate: On",
    autoRotateOff: "Auto-rotate: Off",
    presetLabel: "Lighting",
    presetMuseum: "Museum",
    presetGallery: "Gallery",
    presetHint: "1 = museum, 2 = gallery",
    controlsHint: "LMB: rotate | Wheel: zoom | RMB: pan",
    artifactLabel: "Artifact",
  },
  pl: {
    title: "Szekel kartagiński",
    period: "Koniec IV–początek III wieku p.n.e.",
    obverse: "Głowa Tanit w wieńcu",
    reverse: "Stojący koń",
    body1:
      "Ta kartagińska moneta z elektronu przedstawia na awersie głowę Tanit w wieńcu.",
    body2:
      "Na rewersie znajduje się stojący koń, motyw często spotykany w mennictwie kartagińskim. Model jest cyfrową wizualizacją opartą na wskazanej fotografii źródłowej.",
    download: "Pobierz model 3D (.glb)",
    hint: "Przeciągnij, aby obracać",
    info: "Informacje",
    modelName: "Moneta kartagińska (wizualizacja 3D)",
    mobileModelName: "Moneta kartagińska (wizualizacja 3D)",
    mobileHint: "Przesuń, aby obracać",
    reset: "Resetuj widok",
    autoRotateOn: "Autoobrót: włączony",
    autoRotateOff: "Autoobrót: wyłączony",
    presetLabel: "Oświetlenie",
    presetMuseum: "Muzeum",
    presetGallery: "Galeria",
    presetHint: "1 = muzeum, 2 = galeria",
    controlsHint: "LPM: obrót | Kółko: zoom | PPM: przesuwanie",
    artifactLabel: "Artefakt",
  },
  fr: {
    title: "Shekel carthaginois",
    period: "Fin du IVe–début du IIIe siècle av. J.-C.",
    obverse: "Tête laurée de Tanit",
    reverse: "Cheval debout",
    body1:
      "Cette monnaie carthaginoise en électrum montre à l’avers une tête de Tanit portant une couronne.",
    body2:
      "Le revers représente un cheval debout, motif fréquent du monnayage carthaginois. Ce modèle est une visualisation numérique fondée sur l’image de référence créditée.",
    download: "Télécharger le modèle 3D (.glb)",
    hint: "Glissez pour faire pivoter",
    info: "Informations",
    modelName: "Monnaie carthaginoise (visualisation 3D)",
    mobileModelName: "Monnaie carthaginoise (visualisation 3D)",
    mobileHint: "Glissez pour pivoter",
    reset: "Réinitialiser la vue",
    autoRotateOn: "Rotation automatique : activée",
    autoRotateOff: "Rotation automatique : désactivée",
    presetLabel: "Éclairage",
    presetMuseum: "Musée",
    presetGallery: "Galerie",
    presetHint: "1 = musée, 2 = galerie",
    controlsHint: "Clic gauche : rotation | Molette : zoom | Clic droit : déplacement",
    artifactLabel: "Artefact",
  },
};
