window.minooUi = {
    getLanguage: () => localStorage.getItem("minoo-language") === "en",
    setLanguage: value => {
        const lang = value === "en" ? "en" : "fa";
        localStorage.setItem("minoo-language", lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    },
    getColorTheme: () => {
        const theme = localStorage.getItem("minoo-color-theme");
        return theme === "sage" ? "sage" : "ocean";
    },
    setColorTheme: value => {
        const theme = value === "sage" ? "sage" : "ocean";
        localStorage.setItem("minoo-color-theme", theme);
    }
};