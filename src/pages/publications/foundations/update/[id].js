import React from 'react';
import EditionPublication from "../../../../components/EditionPublication";
import {useRouter} from "next/router";
import withAuth from "../../../../hocs/withAuth";

const PubllicationUpdate = () =>{
    
    const router = useRouter();
    const { id } = router.query

    return(
        <EditionPublication id = {id}/>
    );
}
export default withAuth(PubllicationUpdate);