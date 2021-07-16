import React from 'react';
import EditionPublication from "../../../../components/EditionPublication";
import {useRouter} from "next/router";

const PubllicationUpdate = () =>{
    
    const router = useRouter();
    const { id } = router.query
    console.log('idPublication', id)

    return(
        <EditionPublication id = {id}/>
    );
}
export default PubllicationUpdate;