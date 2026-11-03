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
        document.documentElement.dataset.colorTheme = theme;
        document.querySelectorAll(".app-shell").forEach(shell => {
            shell.classList.remove("theme-ocean", "theme-sage");
            shell.classList.add("theme-" + theme);
        });
    }
};

// Apply the saved palette immediately when the UI script loads.
document.documentElement.dataset.colorTheme = window.minooUi.getColorTheme();
