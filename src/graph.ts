export const msGraphRequest = async (accessToken: string, graphEndpoint: string) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`https://graph.microsoft.com/v1.0/${graphEndpoint}`, { method: "GET", headers });

    return response.json();
};
