window.minooUi = {
    getLanguage: () => localStorage.getItem("minoo-language") === "en",
    setLanguage: value => {
        const lang = value === "en" ? "en" : "fa";
        localStorage.setItem("minoo-language", lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    },
    getTheme: () => {
        const saved = localStorage.getItem("minoo-theme");
        const theme = saved === "light" || saved === "dark" ? saved :
            (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
        document.documentElement.dataset.theme = theme;
        return theme === "dark";
    },
    setTheme: value => {
        const theme = value === "light" ? "light" : "dark";
        localStorage.setItem("minoo-theme", theme);
        document.documentElement.dataset.theme = theme;
    }
};