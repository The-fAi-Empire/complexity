import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "미리보기 표시",
    hidePreviews: "미리보기 숨기기",
  },
  input: {
    searchPlaceholder: "검색...",
  },
  actions: {
    createNewThread: "새 스레드 만들기",
    toggleIncognitoEnable: "시크릿 모드 활성화",
    toggleIncognitoDisable: "시크릿 모드 비활성화",
    toggleLightMode: "라이트 모드로 변경",
    toggleDarkMode: "다크 모드로 변경",
  },
  navigation: {
    home: "홈",
    library: "라이브러리",
    spaces: "스페이스",
    discover: "탐색",
    settings: "설정",
    labs: "실험실",
    current: "현재",
    openInNewTab: "새 탭에서 열기",
    goTo: "{destination}(으)로 이동",
  },
  search: {
    threads: "스레드",
    spaces: "스페이스",
    threadsPlaceholder: "스레드 검색...",
    spacesPlaceholder: "스페이스 검색...",
  },
  groups: {
    actions: "작업",
    navigation: "탐색",
    search: "검색",
  },
  spaces: {
    footer: {
      openInNewTab: "새 탭에서 열기",
      searchInSpace: "스페이스에서 검색",
      goToSpace: "스페이스로 이동",
      searchSpacePlaceholder: "{spaceName} 검색...",
    },
    commandItems: {
      errorFetching: "스페이스 가져오기 오류",
      noSpacesFound: "스페이스를 찾을 수 없음",
    },
    preview: {
      description: "설명",
      instructions: "지침",
      files: "파일 ({count:number})",
      webLinks: "웹 링크 ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "스레드 가져오기 오류",
      noThreadsFound: "스레드를 찾을 수 없음",
    },
  },
  common: {
    noResults: "결과를 찾을 수 없음",
    current: "현재",
  },
} as const satisfies LanguageMessages;
