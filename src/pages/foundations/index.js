import React from 'react';
import ProfileFoundation from "../../../src/components/ProfileFoundation";
import withAuth from "../../hocs/withAuth";

const foundations = () =>{

    return(
        <ProfileFoundation/>
    );
}
export default withAuth(foundations);