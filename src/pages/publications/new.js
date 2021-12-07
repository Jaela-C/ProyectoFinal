import React from 'react';
import RegisterPublication from "@/components/RegisterPublication";
import withAuth from "../../hocs/withAuth";

const New = () =>{
    return(
        <RegisterPublication/>
    );
}
export default withAuth(New);