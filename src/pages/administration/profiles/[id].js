import React from 'react';
import ViewProfile from "../../../components/viewProfile";
import { useRouter } from "next/router";
import withAuth from "../../hocs/withAuth";

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
export default withAuth(Request);