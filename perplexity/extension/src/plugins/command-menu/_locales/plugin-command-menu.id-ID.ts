import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Tampilkan Pratinjau",
    hidePreviews: "Sembunyikan Pratinjau",
  },
  input: {
    searchPlaceholder: "Cari...",
  },
  actions: {
    createNewThread: "Buat Thread Baru",
    toggleIncognitoEnable: "Aktifkan Mode Penyamaran",
    toggleIncognitoDisable: "Nonaktifkan Mode Penyamaran",
    toggleLightMode: "Ubah ke Mode Terang",
    toggleDarkMode: "Ubah ke Mode Gelap",
  },
  navigation: {
    home: "Beranda",
    library: "Perpustakaan",
    spaces: "Ruang",
    discover: "Jelajahi",
    settings: "Pengaturan",
    labs: "Lab",
    current: "Saat Ini",
    openInNewTab: "Buka di tab baru",
    goTo: "Pergi ke {destination}",
  },
  search: {
    threads: "Thread",
    spaces: "Ruang",
    threadsPlaceholder: "Cari Thread...",
    spacesPlaceholder: "Cari Ruang...",
  },
  groups: {
    actions: "Tindakan",
    navigation: "Navigasi",
    search: "Pencarian",
  },
  spaces: {
    footer: {
      openInNewTab: "Buka di tab baru",
      searchInSpace: "Cari di Ruang",
      goToSpace: "Pergi ke Ruang",
      searchSpacePlaceholder: "Cari {spaceName}...",
    },
    commandItems: {
      errorFetching: "Kesalahan saat mengambil Ruang",
      noSpacesFound: "Tidak ada Ruang yang ditemukan",
    },
    preview: {
      description: "Deskripsi",
      instructions: "Instruksi",
      files: "Berkas ({count:number})",
      webLinks: "Tautan Web ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Kesalahan saat mengambil Thread",
      noThreadsFound: "Tidak ada Thread yang ditemukan",
    },
  },
  common: {
    noResults: "Tidak ada hasil yang ditemukan",
    current: "Saat Ini",
  },
} as const satisfies LanguageMessages;
