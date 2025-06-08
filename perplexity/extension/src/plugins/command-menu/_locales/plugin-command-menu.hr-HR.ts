import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Prikaži preglede",
    hidePreviews: "Sakrij preglede",
  },
  input: {
    searchPlaceholder: "Pretraži...",
  },
  actions: {
    createNewThread: "Stvori novu raspravu",
    toggleIncognitoEnable: "Omogući način rada bez praćenja",
    toggleIncognitoDisable: "Onemogući način rada bez praćenja",
    toggleLightMode: "Promijeni na svijetli način rada",
    toggleDarkMode: "Promijeni na tamni način rada",
  },
  navigation: {
    home: "Početna",
    library: "Biblioteka",
    spaces: "Prostori",
    discover: "Otkrij",
    settings: "Postavke",
    labs: "Laboratoriji",
    current: "Trenutno",
    openInNewTab: "Otvori u novoj kartici",
    goTo: "Idi na {destination}",
  },
  search: {
    threads: "Rasprave",
    spaces: "Prostori",
    threadsPlaceholder: "Pretraži rasprave...",
    spacesPlaceholder: "Pretraži prostore...",
  },
  groups: {
    actions: "Radnje",
    navigation: "Navigacija",
    search: "Pretraživanje",
  },
  spaces: {
    footer: {
      openInNewTab: "Otvori u novoj kartici",
      searchInSpace: "Pretraži u prostoru",
      goToSpace: "Idi na prostor",
      searchSpacePlaceholder: "Pretraži {spaceName}...",
    },
    commandItems: {
      errorFetching: "Pogreška pri dohvaćanju prostora",
      noSpacesFound: "Nije pronađen nijedan prostor",
    },
    preview: {
      description: "Opis",
      instructions: "Upute",
      files: "Datoteke ({count:number})",
      webLinks: "Web poveznice ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Pogreška pri dohvaćanju rasprava",
      noThreadsFound: "Nije pronađena nijedna rasprava",
    },
  },
  common: {
    noResults: "Nisu pronađeni rezultati",
    current: "Trenutno",
  },
} as const satisfies LanguageMessages;
