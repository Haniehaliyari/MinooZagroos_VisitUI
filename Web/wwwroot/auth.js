window.authCookie = {
    getTheme: () => {
        const saved = localStorage.getItem("minoo-theme");
        const theme = saved === "light" || saved === "dark"
            ? saved
            : (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
        document.documentElement.dataset.theme = theme;
        return theme === "dark";
    },
    setTheme: (theme) => {
        const normalized = theme === "light" ? "light" : "dark";
        localStorage.setItem("minoo-theme", normalized);
        document.documentElement.dataset.theme = normalized;
    },
    login: async (username, password) => {
        const response = await fetch("/auth/login", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || "ورود انجام نشد.");
        return true;
    },
    logout: async () => {
        const response = await fetch("/auth/logout", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("خروج از حساب انجام نشد.");
        return true;
    }
};
