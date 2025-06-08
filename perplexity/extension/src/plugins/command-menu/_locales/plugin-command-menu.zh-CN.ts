import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "显示预览",
    hidePreviews: "隐藏预览",
  },
  input: {
    searchPlaceholder: "搜索...",
  },
  actions: {
    createNewThread: "创建新对话",
    toggleIncognitoEnable: "启用隐身模式",
    toggleIncognitoDisable: "禁用隐身模式",
    toggleLightMode: "切换至浅色模式",
    toggleDarkMode: "切换至深色模式",
  },
  navigation: {
    home: "首页",
    library: "资料库",
    spaces: "空间",
    discover: "发现",
    settings: "设置",
    labs: "实验室",
    current: "当前",
    openInNewTab: "在新标签页中打开",
    goTo: "前往{destination}",
  },
  search: {
    threads: "对话",
    spaces: "空间",
    threadsPlaceholder: "搜索对话...",
    spacesPlaceholder: "搜索空间...",
  },
  groups: {
    actions: "操作",
    navigation: "导航",
    search: "搜索",
  },
  spaces: {
    footer: {
      openInNewTab: "在新标签页中打开",
      searchInSpace: "在空间中搜索",
      goToSpace: "前往空间",
      searchSpacePlaceholder: "搜索{spaceName}...",
    },
    commandItems: {
      errorFetching: "获取空间时出错",
      noSpacesFound: "未找到空间",
    },
    preview: {
      description: "描述",
      instructions: "指引",
      files: "文件 ({count:number})",
      webLinks: "网页链接 ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "获取对话时出错",
      noThreadsFound: "未找到对话",
    },
  },
  common: {
    noResults: "未找到结果",
    current: "当前",
  },
} as const satisfies LanguageMessages;
