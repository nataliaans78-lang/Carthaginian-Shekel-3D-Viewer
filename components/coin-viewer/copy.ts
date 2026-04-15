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
    period: "3rd century BCE",
    obverse: "Head of Tanit",
    reverse: "Standing horse",
    body1:
      "This gold coin was struck in Carthage over two thousand years ago. On the obverse we see Tanit, the city's principal goddess and one of its most important symbols.",
    body2:
      "The reverse shows a standing horse, a familiar image in Carthaginian coinage often linked to strength and identity. The 3D model presents the object as a digital museum-style reconstruction.",
    download: "Download 3D model (.glb)",
    hint: "Drag to rotate",
    info: "Info",
    modelName: "Coin of Tanit (3D visualization)",
    mobileModelName: "Coin of Tanit (3D visualization)",
    mobileHint: "Swipe to rotate",
    reset: "Reset view",
    autoRotateOn: "Auto-rotate: On",
    autoRotateOff: "Auto-rotate: Off",
    presetLabel: "Preset",
    presetMuseum: "Museum",
    presetGallery: "Gallery",
    presetHint: "1 = museum, 2 = gallery",
    controlsHint: "LMB rotate | Wheel zoom | RMB pan",
    artifactLabel: "Artifact",
  },
  pl: {
    title: "Szekel kartagiński",
    period: "III wiek p.n.e.",
    obverse: "Awers: głowa Tanit",
    reverse: "Rewers: stojący koń",
    body1:
      "Ta złota moneta została wybita w Kartaginie ponad dwa tysiące lat temu. Na awersie widzimy Tanit, główne bóstwo miasta i jeden z jego najważniejszych symboli.",
    body2:
      "Rewers przedstawia stojącego konia, motyw dobrze znany z mennictwa kartagińskiego, często wiązany z siłą i tożsamością. Model 3D pokazuje obiekt jako cyfrową rekonstrukcję w muzealnym stylu.",
    download: "Pobierz model 3D (.glb)",
    hint: "Przeciągnij, aby obracać",
    info: "Info",
    modelName: "Moneta Tanit (wizualizacja 3D)",
    mobileModelName: "Moneta Tanit (wizualizacja 3D)",
    mobileHint: "Przesuń, aby obracać",
    reset: "Resetuj widok",
    autoRotateOn: "Auto-rotate: On",
    autoRotateOff: "Auto-rotate: Off",
    presetLabel: "Preset",
    presetMuseum: "Muzeum",
    presetGallery: "Galeria",
    presetHint: "1 = muzeum, 2 = galeria",
    controlsHint: "LPM obrót | Kółko zoom | PPM przesuwanie",
    artifactLabel: "Artefakt",
  },
  fr: {
    title: "Shekel carthaginois",
    period: "IIIe siècle av. J.-C.",
    obverse: "Avers : tête de Tanit",
    reverse: "Revers : cheval debout",
    body1:
      "Cette monnaie d'or a été frappée à Carthage il y a plus de deux mille ans. Sur l'avers apparaît Tanit, déesse principale de la cité et l'un de ses symboles majeurs.",
    body2:
      "Le revers montre un cheval debout, motif familier du monnayage carthaginois, souvent associé à la force et à l'identité. Le modèle 3D présente l'objet comme une reconstruction numérique de style muséal.",
    download: "Télécharger le modèle 3D (.glb)",
    hint: "Glissez pour faire pivoter",
    info: "Info",
    modelName: "Monnaie de Tanit (visualisation 3D)",
    mobileModelName: "Monnaie de Tanit (visualisation 3D)",
    mobileHint: "Glissez pour pivoter",
    reset: "Réinitialiser la vue",
    autoRotateOn: "Auto-rotate: On",
    autoRotateOff: "Auto-rotate: Off",
    presetLabel: "Préréglage",
    presetMuseum: "Musée",
    presetGallery: "Galerie",
    presetHint: "1 = musée, 2 = galerie",
    controlsHint: "LMB pivoter | Molette zoom | RMB déplacer",
    artifactLabel: "Artefact",
  },
};
