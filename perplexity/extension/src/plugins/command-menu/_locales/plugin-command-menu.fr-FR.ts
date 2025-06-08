import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Afficher les aperçus",
    hidePreviews: "Masquer les aperçus",
  },
  input: {
    searchPlaceholder: "Rechercher...",
  },
  actions: {
    createNewThread: "Créer une nouvelle conversation",
    toggleIncognitoEnable: "Activer le mode navigation privée",
    toggleIncognitoDisable: "Désactiver le mode navigation privée",
    toggleLightMode: "Passer au mode clair",
    toggleDarkMode: "Passer au mode sombre",
  },
  navigation: {
    home: "Accueil",
    library: "Bibliothèque",
    spaces: "Espaces",
    discover: "Découvrir",
    settings: "Paramètres",
    labs: "Laboratoires",
    current: "Actuel",
    openInNewTab: "Ouvrir dans un nouvel onglet",
    goTo: "Aller à {destination}",
  },
  search: {
    threads: "Conversations",
    spaces: "Espaces",
    threadsPlaceholder: "Rechercher des conversations...",
    spacesPlaceholder: "Rechercher des espaces...",
  },
  groups: {
    actions: "Actions",
    navigation: "Navigation",
    search: "Recherche",
  },
  spaces: {
    footer: {
      openInNewTab: "Ouvrir dans un nouvel onglet",
      searchInSpace: "Rechercher dans l'espace",
      goToSpace: "Aller à l'espace",
      searchSpacePlaceholder: "Rechercher {spaceName}...",
    },
    commandItems: {
      errorFetching: "Erreur lors de la récupération des espaces",
      noSpacesFound: "Aucun espace trouvé",
    },
    preview: {
      description: "Description",
      instructions: "Instructions",
      files: "Fichiers ({count:number})",
      webLinks: "Liens web ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Erreur lors de la récupération des conversations",
      noThreadsFound: "Aucune conversation trouvée",
    },
  },
  common: {
    noResults: "Aucun résultat trouvé",
    current: "Actuel",
  },
} as const satisfies LanguageMessages;
