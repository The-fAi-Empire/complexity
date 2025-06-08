import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Mostrar prévias",
    hidePreviews: "Ocultar prévias",
  },
  input: {
    searchPlaceholder: "Pesquisar...",
  },
  actions: {
    createNewThread: "Criar nova conversa",
    toggleIncognitoEnable: "Ativar modo anônimo",
    toggleIncognitoDisable: "Desativar modo anônimo",
    toggleLightMode: "Mudar para modo claro",
    toggleDarkMode: "Mudar para modo escuro",
  },
  navigation: {
    home: "Início",
    library: "Biblioteca",
    spaces: "Espaços",
    discover: "Descobrir",
    settings: "Configurações",
    labs: "Laboratórios",
    current: "Atual",
    openInNewTab: "Abrir em nova aba",
    goTo: "Ir para {destination}",
  },
  search: {
    threads: "Conversas",
    spaces: "Espaços",
    threadsPlaceholder: "Pesquisar conversas...",
    spacesPlaceholder: "Pesquisar espaços...",
  },
  groups: {
    actions: "Ações",
    navigation: "Navegação",
    search: "Pesquisa",
  },
  spaces: {
    footer: {
      openInNewTab: "Abrir em nova aba",
      searchInSpace: "Pesquisar no espaço",
      goToSpace: "Ir para o espaço",
      searchSpacePlaceholder: "Pesquisar {spaceName}...",
    },
    commandItems: {
      errorFetching: "Erro ao buscar espaços",
      noSpacesFound: "Nenhum espaço encontrado",
    },
    preview: {
      description: "Descrição",
      instructions: "Instruções",
      files: "Arquivos ({count:number})",
      webLinks: "Links da web ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Erro ao buscar conversas",
      noThreadsFound: "Nenhuma conversa encontrada",
    },
  },
  common: {
    noResults: "Nenhum resultado encontrado",
    current: "Atual",
  },
} as const satisfies LanguageMessages;
