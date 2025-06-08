import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Прикажи прегледе",
    hidePreviews: "Сакриј прегледе",
  },
  input: {
    searchPlaceholder: "Претрага...",
  },
  actions: {
    createNewThread: "Креирај нову дискусију",
    toggleIncognitoEnable: "Укључи инкогнито режим",
    toggleIncognitoDisable: "Искључи инкогнито режим",
    toggleLightMode: "Промијени на свијетли режим",
    toggleDarkMode: "Промијени на тамни режим",
  },
  navigation: {
    home: "Почетна",
    library: "Библиотека",
    spaces: "Простори",
    discover: "Откривање",
    settings: "Подешавања",
    labs: "Лабораторије",
    current: "Тренутно",
    openInNewTab: "Отвори у новој картици",
    goTo: "Иди на {destination}",
  },
  search: {
    threads: "Дискусије",
    spaces: "Простори",
    threadsPlaceholder: "Претражи дискусије...",
    spacesPlaceholder: "Претражи просторе...",
  },
  groups: {
    actions: "Акције",
    navigation: "Навигација",
    search: "Претрага",
  },
  spaces: {
    footer: {
      openInNewTab: "Отвори у новој картици",
      searchInSpace: "Претражи у простору",
      goToSpace: "Иди на простор",
      searchSpacePlaceholder: "Претражи {spaceName}...",
    },
    commandItems: {
      errorFetching: "Грешка при преузимању простора",
      noSpacesFound: "Нису пронађени простори",
    },
    preview: {
      description: "Опис",
      instructions: "Упутства",
      files: "Фајлови ({count:number})",
      webLinks: "Веб линкови ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Грешка при преузимању дискусија",
      noThreadsFound: "Нису пронађене дискусије",
    },
  },
  common: {
    noResults: "Нису пронађени резултати",
    current: "Тренутно",
  },
} as const satisfies LanguageMessages;
