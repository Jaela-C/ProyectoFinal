import React from 'react';
import ViewRequest from "../../../components/ViewRequest";
import { useRouter } from "next/router";

const Request = () =>{
    
    const router = useRouter();
    const { id } = router.query

    return(
        <>
            {
                id !== undefined ?
                (
                    <ViewRequest id = {id}/>
                ) : "cargando.."
            }
        </>
    );
}
export default Request;