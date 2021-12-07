import React from "react";
import Registeradmin from "../components/Registeradmin";
import withoutAuth from "../hocs/withoutAuth";

const Admin = () => {
    return (
        <Registeradmin/>
    );
};
export default withoutAuth(Admin);