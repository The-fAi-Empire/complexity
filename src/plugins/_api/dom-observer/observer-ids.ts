const OBSERVER_IDS = [
  "colorScheme",
  "pplxCookies",

  "sidebar:wrapper",
  "sidebar:wrapper:openState",

  "queryBoxes",
  "queryBoxes:home",
  "queryBoxes:collection",
  "queryBoxes:followUp",
  "queryBoxes:pplxComponentsWrapper",

  "home",
  "home:languageSelector",

  "thread",
  "thread:messageBlocks",
  "thread:codeBlocks",
  "thread:tocSidebarObserver",

  "spacesPage",

  "settingsPage:topNavWrapper",
] as const;

export type ObserverId = (typeof OBSERVER_IDS)[number];
