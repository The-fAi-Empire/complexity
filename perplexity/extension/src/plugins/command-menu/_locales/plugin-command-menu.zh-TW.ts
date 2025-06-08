import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "顯示預覽",
    hidePreviews: "隱藏預覽",
  },
  input: {
    searchPlaceholder: "搜尋...",
  },
  actions: {
    createNewThread: "建立新對話",
    toggleIncognitoEnable: "啟用無痕模式",
    toggleIncognitoDisable: "停用無痕模式",
    toggleLightMode: "切換至淺色模式",
    toggleDarkMode: "切換至深色模式",
  },
  navigation: {
    home: "首頁",
    library: "資料庫",
    spaces: "空間",
    discover: "探索",
    settings: "設定",
    labs: "實驗室",
    current: "目前",
    openInNewTab: "在新分頁中開啟",
    goTo: "前往{destination}",
  },
  search: {
    threads: "對話",
    spaces: "空間",
    threadsPlaceholder: "搜尋對話...",
    spacesPlaceholder: "搜尋空間...",
  },
  groups: {
    actions: "動作",
    navigation: "導覽",
    search: "搜尋",
  },
  spaces: {
    footer: {
      openInNewTab: "在新分頁中開啟",
      searchInSpace: "在空間中搜尋",
      goToSpace: "前往空間",
      searchSpacePlaceholder: "搜尋{spaceName}...",
    },
    commandItems: {
      errorFetching: "獲取空間時發生錯誤",
      noSpacesFound: "找不到空間",
    },
    preview: {
      description: "描述",
      instructions: "指示",
      files: "檔案 ({count:number})",
      webLinks: "網頁連結 ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "獲取對話時發生錯誤",
      noThreadsFound: "找不到對話",
    },
  },
  common: {
    noResults: "找不到結果",
    current: "目前",
  },
} as const satisfies LanguageMessages;
