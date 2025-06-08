import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Mostra anteprime",
    hidePreviews: "Nascondi anteprime",
  },
  input: {
    searchPlaceholder: "Cerca...",
  },
  actions: {
    createNewThread: "Crea nuova discussione",
    toggleIncognitoEnable: "Attiva modalità incognito",
    toggleIncognitoDisable: "Disattiva modalità incognito",
    toggleLightMode: "Passa alla modalità chiara",
    toggleDarkMode: "Passa alla modalità scura",
  },
  navigation: {
    home: "Home",
    library: "Libreria",
    spaces: "Spazi",
    discover: "Scopri",
    settings: "Impostazioni",
    labs: "Laboratori",
    current: "Attuale",
    openInNewTab: "Apri in nuova scheda",
    goTo: "Vai a {destination}",
  },
  search: {
    threads: "Discussioni",
    spaces: "Spazi",
    threadsPlaceholder: "Cerca discussioni...",
    spacesPlaceholder: "Cerca spazi...",
  },
  groups: {
    actions: "Azioni",
    navigation: "Navigazione",
    search: "Ricerca",
  },
  spaces: {
    footer: {
      openInNewTab: "Apri in nuova scheda",
      searchInSpace: "Cerca nello spazio",
      goToSpace: "Vai allo spazio",
      searchSpacePlaceholder: "Cerca {spaceName}...",
    },
    commandItems: {
      errorFetching: "Errore nel recupero degli spazi",
      noSpacesFound: "Nessuno spazio trovato",
    },
    preview: {
      description: "Descrizione",
      instructions: "Istruzioni",
      files: "File ({count:number})",
      webLinks: "Link web ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Errore nel recupero delle discussioni",
      noThreadsFound: "Nessuna discussione trovata",
    },
  },
  common: {
    noResults: "Nessun risultato trovato",
    current: "Attuale",
  },
} as const satisfies LanguageMessages;
