import React from 'react';
import EditionProfileFoundation from "../../../src/components/EditionProfileFoundation";
import {useRouter} from "next/router";

const FoundationUpdate = () =>{
    
    const router = useRouter();
    const { id } = router.query
    console.log('idUser', id)

    return(
        <EditionProfileFoundation id = {id}/>
    );
}
export default FoundationUpdate;