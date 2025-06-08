import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Zobrazit náhledy",
    hidePreviews: "Skrýt náhledy",
  },
  input: {
    searchPlaceholder: "Hledat...",
  },
  actions: {
    createNewThread: "Vytvořit nové vlákno",
    toggleIncognitoEnable: "Povolit režim inkognito",
    toggleIncognitoDisable: "Zakázat režim inkognito",
    toggleLightMode: "Přepnout na světlý režim",
    toggleDarkMode: "Přepnout na tmavý režim",
  },
  navigation: {
    home: "Domů",
    library: "Knihovna",
    spaces: "Prostory",
    discover: "Objevovat",
    settings: "Nastavení",
    labs: "Laboratoře",
    current: "Aktuální",
    openInNewTab: "Otevřít v nové záložce",
    goTo: "Přejít na {destination}",
  },
  search: {
    threads: "Vlákna",
    spaces: "Prostory",
    threadsPlaceholder: "Hledat vlákna...",
    spacesPlaceholder: "Hledat prostory...",
  },
  groups: {
    actions: "Akce",
    navigation: "Navigace",
    search: "Hledat",
  },
  spaces: {
    footer: {
      openInNewTab: "Otevřít v nové záložce",
      searchInSpace: "Hledat v prostoru",
      goToSpace: "Přejít do prostoru",
      searchSpacePlaceholder: "Hledat {spaceName}...",
    },
    commandItems: {
      errorFetching: "Chyba při načítání prostorů",
      noSpacesFound: "Žádné prostory nenalezeny",
    },
    preview: {
      description: "Popis",
      instructions: "Instrukce",
      files: "Soubory ({count:number})",
      webLinks: "Webové odkazy ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Chyba při načítání vláken",
      noThreadsFound: "Žádná vlákna nenalezena",
    },
  },
  common: {
    noResults: "Žádné výsledky nenalezeny",
    current: "Aktuální",
  },
} as const satisfies LanguageMessages;
