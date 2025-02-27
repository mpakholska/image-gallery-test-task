export const UNSPLASH_AUTH_URL = `https://unsplash.com/oauth/authorize
?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}
&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}
&response_type=code&scope=read_user%20write_likes%20read_photos`;

export const getAccessToken = () => {
    return localStorage.getItem("unsplash_token");
};

export const authenticateUser = () => {
    if (!getAccessToken()) {
        window.location.href = UNSPLASH_AUTH_URL;
    }
};

export const exchangeCodeForToken = async (code: string) => {
    const response = await fetch("https://unsplash.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL,
            client_secret: process.env.NEXT_PUBLIC_UNSPLASH_SECRET_KEY,
            code,
            grant_type: "authorization_code",
        }),
    });

    const data = await response.json();
    if (data.access_token) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("unsplash_token", data.access_token);
    }
    return data;
};
