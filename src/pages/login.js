import React from "react";
import LoginForm from "../components/login";
import withoutAuth from "../hocs/withoutAuth";

const Login = () => {
    return (
            <LoginForm/>
    );
};
export default withoutAuth(Login);