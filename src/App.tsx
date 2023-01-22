import { AuthenticationResult } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import "./App.tsx.css";
import Constants from "./constants";
import MsProfile from "./MsProfile";

export default function App() {
    const [authenticationResult, setAuthenticationResult] = useState<AuthenticationResult>();

    const { accounts, instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleOnClick = () => isAuthenticated ? instance.logoutPopup() : instance.loginPopup(Constants.LoginRequest);

    useEffect(() => {
        const getAccessToken = async () => {
            if (isAuthenticated) {
                const request = {
                    ...Constants.LoginRequest,
                    account: accounts[0],
                };

                setAuthenticationResult(await instance.acquireTokenSilent(request));
            }
        };

        getAccessToken();
    }, [isAuthenticated, accounts, instance]);

    return (
        <div className="app">
            {isAuthenticated && authenticationResult ? <MsProfile authenticationResult={authenticationResult} /> : null}
            <button type="button" onClick={handleOnClick}>{isAuthenticated ? "Logout" : "Login"}</button>
        </div>
    );
}
