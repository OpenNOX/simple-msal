import { Configuration, PopupRequest } from "@azure/msal-browser";

export interface IConstants {
    ApplicationObjectId: string,
    LoginRequest: PopupRequest,
    MsalConfig: Configuration,
}

const Constants = Object.freeze<IConstants>({
    ApplicationObjectId: "7c951235-12f0-49b7-9abb-b3e39be5f315",
    LoginRequest: {
        scopes: ["User.Read"],
    },
    MsalConfig: {
        auth: {
            authority: "https://login.microsoftonline.com/common",
            clientId: "10d12c8b-9157-4c88-a3fb-1cac5c6c6d0d",
            redirectUri: process.env.REACT_APP_REDIRECT_URI,
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false,
        },
    },
});

export default Constants;
