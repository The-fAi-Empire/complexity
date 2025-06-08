import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Afișează previzualizări",
    hidePreviews: "Ascunde previzualizări",
  },
  input: {
    searchPlaceholder: "Caută...",
  },
  actions: {
    createNewThread: "Creează conversație nouă",
    toggleIncognitoEnable: "Activează modul incognito",
    toggleIncognitoDisable: "Dezactivează modul incognito",
    toggleLightMode: "Schimbă la modul luminos",
    toggleDarkMode: "Schimbă la modul întunecat",
  },
  navigation: {
    home: "Acasă",
    library: "Bibliotecă",
    spaces: "Spații",
    discover: "Descoperă",
    settings: "Setări",
    labs: "Laboratoare",
    current: "Curent",
    openInNewTab: "Deschide în filă nouă",
    goTo: "Mergi la {destination}",
  },
  search: {
    threads: "Conversații",
    spaces: "Spații",
    threadsPlaceholder: "Caută conversații...",
    spacesPlaceholder: "Caută spații...",
  },
  groups: {
    actions: "Acțiuni",
    navigation: "Navigare",
    search: "Căutare",
  },
  spaces: {
    footer: {
      openInNewTab: "Deschide în filă nouă",
      searchInSpace: "Caută în spațiu",
      goToSpace: "Mergi la spațiu",
      searchSpacePlaceholder: "Caută {spaceName}...",
    },
    commandItems: {
      errorFetching: "Eroare la preluarea spațiilor",
      noSpacesFound: "Nu s-au găsit spații",
    },
    preview: {
      description: "Descriere",
      instructions: "Instrucțiuni",
      files: "Fișiere ({count:number})",
      webLinks: "Linkuri web ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Eroare la preluarea conversațiilor",
      noThreadsFound: "Nu s-au găsit conversații",
    },
  },
  common: {
    noResults: "Nu s-au găsit rezultate",
    current: "Curent",
  },
} as const satisfies LanguageMessages;
