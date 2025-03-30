import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const clientId = "401229662989-84cb0jgoskgjdutr0cbjc6su0gdkhpvj.apps.googleusercontent.com";

function GoogleLoginButton() {
    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        console.log("Google Token:", token);

        // Send token to Flask backend
        try {
            const response = await axios.post("/auth/google", { "token": token });
            console.log("Backend Response:", response.data);
            window.location.assign("/");
            
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
