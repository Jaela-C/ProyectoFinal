import React from "react";
import Registeruser from "../components/Registeruser";
import withoutAuth from "../hocs/withoutAuth";

const User = () => {
    return (
            <Registeruser/>
    );
};
export default withoutAuth(User);