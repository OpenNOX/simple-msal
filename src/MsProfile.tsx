import { AuthenticationResult } from "@azure/msal-browser";
import { User } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { msGraphRequest } from "./graph";
import "./MsProfile.tsx.css"

export interface IMsProfileProps {
    authenticationResult: AuthenticationResult,
}

export default function MsProfile({ authenticationResult }: IMsProfileProps) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const fetchData = async () => { setUser(await msGraphRequest(authenticationResult.accessToken, "me")); };

        fetchData();
    }, [authenticationResult.accessToken]);

    const appRoles = authenticationResult.account?.idTokenClaims?.roles?.join(", ") ?? "No App Roles";

    return user !== undefined ? (
        <div className="ms-profile">
            <h1>Microsoft Graph Details</h1>
            <table>
                <tbody>
                    <tr><th>Graph ID</th><td>{user?.id}</td></tr>
                    <tr><th>Display Name</th><td>{user?.displayName}</td></tr>
                    <tr><th>User Principal Name</th><td>{user?.userPrincipalName}</td></tr>
                    <tr><th>First Name</th><td>{user?.givenName}</td></tr>
                    <tr><th>Last Name</th><td>{user?.surname}</td></tr>
                    <tr><th>App Roles</th><td>{appRoles}</td></tr>
                </tbody>
            </table>
        </div>
    ) : null;
}
