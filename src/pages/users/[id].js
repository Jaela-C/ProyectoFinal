import React from 'react';
import EditionProfileUser from "../../../src/components/EditionProfileUser";
import {useRouter} from "next/router";
import withAuth from "../../hocs/withAuth";

const ProfileUpdate = () =>{
    
    const router = useRouter();
    const { id } = router.query
    
    return(
        <>
            {
                id !== undefined ?
                (
                    <EditionProfileUser id = {id}/>
                ) : "cargando.."
            }
        </>
    );
}
export default withAuth(ProfileUpdate);