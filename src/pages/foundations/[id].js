import React from 'react';
import EditionProfileFoundation from "../../../src/components/EditionProfileFoundation";
import {useRouter} from "next/router";

const FoundationUpdate = () =>{
    
    const router = useRouter();
    const { id } = router.query

    return(
        <>
            {
                id !== undefined ?
                (
                    <EditionProfileFoundation id = {id}/>
                ) : "cargando.."
            }
        </>
    );
}
export default FoundationUpdate;