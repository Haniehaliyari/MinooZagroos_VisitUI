window.authCookie = {
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
