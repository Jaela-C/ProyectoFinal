import React from 'react';
import ViewProfile from "../../../components/viewProfile";
import { useRouter } from "next/router";

const Request = () =>{
    
    const router = useRouter();
    const { id } = router.query

    return(
        <>
            {
                id !== undefined ?
                (
                    <ViewProfile id = {id}/>
                ) : "cargando.."
            }
        </>
    );
}
export default Request;