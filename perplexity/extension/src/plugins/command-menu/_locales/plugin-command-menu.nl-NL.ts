import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Voorbeelden tonen",
    hidePreviews: "Voorbeelden verbergen",
  },
  input: {
    searchPlaceholder: "Zoeken...",
  },
  actions: {
    createNewThread: "Nieuwe thread maken",
    toggleIncognitoEnable: "Incognitomodus inschakelen",
    toggleIncognitoDisable: "Incognitomodus uitschakelen",
    toggleLightMode: "Overschakelen naar lichte modus",
    toggleDarkMode: "Overschakelen naar donkere modus",
  },
  navigation: {
    home: "Home",
    library: "Bibliotheek",
    spaces: "Ruimtes",
    discover: "Ontdekken",
    settings: "Instellingen",
    labs: "Labs",
    current: "Huidig",
    openInNewTab: "Openen in nieuw tabblad",
    goTo: "Ga naar {destination}",
  },
  search: {
    threads: "Threads",
    spaces: "Ruimtes",
    threadsPlaceholder: "Threads zoeken...",
    spacesPlaceholder: "Ruimtes zoeken...",
  },
  groups: {
    actions: "Acties",
    navigation: "Navigatie",
    search: "Zoeken",
  },
  spaces: {
    footer: {
      openInNewTab: "Openen in nieuw tabblad",
      searchInSpace: "Zoeken in ruimte",
      goToSpace: "Ga naar ruimte",
      searchSpacePlaceholder: "Zoeken in {spaceName}...",
    },
    commandItems: {
      errorFetching: "Fout bij ophalen van ruimtes",
      noSpacesFound: "Geen ruimtes gevonden",
    },
    preview: {
      description: "Beschrijving",
      instructions: "Instructies",
      files: "Bestanden ({count:number})",
      webLinks: "Weblinks ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Fout bij ophalen van threads",
      noThreadsFound: "Geen threads gevonden",
    },
  },
  common: {
    noResults: "Geen resultaten gevonden",
    current: "Huidig",
  },
} as const satisfies LanguageMessages;
