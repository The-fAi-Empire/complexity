import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Pokaż podglądy",
    hidePreviews: "Ukryj podglądy",
  },
  input: {
    searchPlaceholder: "Szukaj...",
  },
  actions: {
    createNewThread: "Utwórz nowy wątek",
    toggleIncognitoEnable: "Włącz tryb incognito",
    toggleIncognitoDisable: "Wyłącz tryb incognito",
    toggleLightMode: "Zmień na jasny motyw",
    toggleDarkMode: "Zmień na ciemny motyw",
  },
  navigation: {
    home: "Strona główna",
    library: "Biblioteka",
    spaces: "Przestrzenie",
    discover: "Odkrywaj",
    settings: "Ustawienia",
    labs: "Laboratoria",
    current: "Bieżący",
    openInNewTab: "Otwórz w nowej karcie",
    goTo: "Przejdź do {destination}",
  },
  search: {
    threads: "Wątki",
    spaces: "Przestrzenie",
    threadsPlaceholder: "Szukaj wątków...",
    spacesPlaceholder: "Szukaj przestrzeni...",
  },
  groups: {
    actions: "Akcje",
    navigation: "Nawigacja",
    search: "Szukaj",
  },
  spaces: {
    footer: {
      openInNewTab: "Otwórz w nowej karcie",
      searchInSpace: "Szukaj w przestrzeni",
      goToSpace: "Przejdź do przestrzeni",
      searchSpacePlaceholder: "Szukaj w {spaceName}...",
    },
    commandItems: {
      errorFetching: "Błąd podczas pobierania przestrzeni",
      noSpacesFound: "Nie znaleziono przestrzeni",
    },
    preview: {
      description: "Opis",
      instructions: "Instrukcje",
      files: "Pliki ({count:number})",
      webLinks: "Linki internetowe ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Błąd podczas pobierania wątków",
      noThreadsFound: "Nie znaleziono wątków",
    },
  },
  common: {
    noResults: "Nie znaleziono wyników",
    current: "Bieżący",
  },
} as const satisfies LanguageMessages;
