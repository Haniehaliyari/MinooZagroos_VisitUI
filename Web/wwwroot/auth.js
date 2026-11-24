window.authCookie = {
    getTheme: () => {
        // One-time reset after the appearance-switch update: start in light mode,
        // then preserve the user's own choice on subsequent visits.
        const initialized = localStorage.getItem("minoo-theme-v2-initialized");
        if (initialized !== "1") {
            localStorage.setItem("minoo-theme", "light");
            localStorage.setItem("minoo-theme-v2-initialized", "1");
        }

        const saved = localStorage.getItem("minoo-theme");
        const theme = saved === "dark" ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        return theme === "dark";
    },
    setTheme: (theme) => {
        const normalized = theme === "dark" ? "dark" : "light";
        localStorage.setItem("minoo-theme", normalized);
        localStorage.setItem("minoo-theme-v2-initialized", "1");
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
