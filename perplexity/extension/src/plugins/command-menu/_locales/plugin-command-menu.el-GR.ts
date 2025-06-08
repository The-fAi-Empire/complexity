import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Εμφάνιση προεπισκοπήσεων",
    hidePreviews: "Απόκρυψη προεπισκοπήσεων",
  },
  input: {
    searchPlaceholder: "Αναζήτηση...",
  },
  actions: {
    createNewThread: "Δημιουργία νέας συζήτησης",
    toggleIncognitoEnable: "Ενεργοποίηση λειτουργίας ανώνυμης περιήγησης",
    toggleIncognitoDisable: "Απενεργοποίηση λειτουργίας ανώνυμης περιήγησης",
    toggleLightMode: "Αλλαγή σε φωτεινό θέμα",
    toggleDarkMode: "Αλλαγή σε σκοτεινό θέμα",
  },
  navigation: {
    home: "Αρχική",
    library: "Βιβλιοθήκη",
    spaces: "Χώροι",
    discover: "Ανακάλυψη",
    settings: "Ρυθμίσεις",
    labs: "Εργαστήρια",
    current: "Τρέχον",
    openInNewTab: "Άνοιγμα σε νέα καρτέλα",
    goTo: "Μετάβαση στο {destination}",
  },
  search: {
    threads: "Συζητήσεις",
    spaces: "Χώροι",
    threadsPlaceholder: "Αναζήτηση συζητήσεων...",
    spacesPlaceholder: "Αναζήτηση χώρων...",
  },
  groups: {
    actions: "Ενέργειες",
    navigation: "Πλοήγηση",
    search: "Αναζήτηση",
  },
  spaces: {
    footer: {
      openInNewTab: "Άνοιγμα σε νέα καρτέλα",
      searchInSpace: "Αναζήτηση στο χώρο",
      goToSpace: "Μετάβαση στο χώρο",
      searchSpacePlaceholder: "Αναζήτηση στο {spaceName}...",
    },
    commandItems: {
      errorFetching: "Σφάλμα κατά τη λήψη χώρων",
      noSpacesFound: "Δεν βρέθηκαν χώροι",
    },
    preview: {
      description: "Περιγραφή",
      instructions: "Οδηγίες",
      files: "Αρχεία ({count:number})",
      webLinks: "Σύνδεσμοι ιστού ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Σφάλμα κατά τη λήψη συζητήσεων",
      noThreadsFound: "Δεν βρέθηκαν συζητήσεις",
    },
  },
  common: {
    noResults: "Δεν βρέθηκαν αποτελέσματα",
    current: "Τρέχον",
  },
} as const satisfies LanguageMessages;
