import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Mostrar vistas previas",
    hidePreviews: "Ocultar vistas previas",
  },
  input: {
    searchPlaceholder: "Buscar...",
  },
  actions: {
    createNewThread: "Crear nueva conversación",
    toggleIncognitoEnable: "Activar modo incógnito",
    toggleIncognitoDisable: "Desactivar modo incógnito",
    toggleLightMode: "Cambiar a modo claro",
    toggleDarkMode: "Cambiar a modo oscuro",
  },
  navigation: {
    home: "Inicio",
    library: "Biblioteca",
    spaces: "Espacios",
    discover: "Descubrir",
    settings: "Configuración",
    labs: "Laboratorios",
    current: "Actual",
    openInNewTab: "Abrir en nueva pestaña",
    goTo: "Ir a {destination}",
  },
  search: {
    threads: "Conversaciones",
    spaces: "Espacios",
    threadsPlaceholder: "Buscar conversaciones...",
    spacesPlaceholder: "Buscar espacios...",
  },
  groups: {
    actions: "Acciones",
    navigation: "Navegación",
    search: "Búsqueda",
  },
  spaces: {
    footer: {
      openInNewTab: "Abrir en nueva pestaña",
      searchInSpace: "Buscar en espacio",
      goToSpace: "Ir al espacio",
      searchSpacePlaceholder: "Buscar en {spaceName}...",
    },
    commandItems: {
      errorFetching: "Error al obtener espacios",
      noSpacesFound: "No se encontraron espacios",
    },
    preview: {
      description: "Descripción",
      instructions: "Instrucciones",
      files: "Archivos ({count:number})",
      webLinks: "Enlaces web ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Error al obtener conversaciones",
      noThreadsFound: "No se encontraron conversaciones",
    },
  },
  common: {
    noResults: "No se encontraron resultados",
    current: "Actual",
  },
} as const satisfies LanguageMessages;
