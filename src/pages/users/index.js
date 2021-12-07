import React from 'react';
import ProfileUser from "../../../src/components/ProfileUser";
import withAuth from "../../hocs/withAuth";

const users = () =>{

    return(
        <ProfileUser/>
    );
}
export default withAuth(users);