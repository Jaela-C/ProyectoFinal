import React from "react";
import TypeUser from "../components/Type";
import withoutAuth from "../hocs/withoutAuth";

const Type = () => {
    return (
            <TypeUser/>
    );
};
export default withoutAuth(Type);