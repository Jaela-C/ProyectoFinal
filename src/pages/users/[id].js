import React from 'react';
import EditionProfileUser from "../../../src/components/EditionProfileUser";
import {useRouter} from "next/router";

const ProfileUpdate = () =>{
    
    const router = useRouter();
    const { id } = router.query
    console.log('idUser', id)
    
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
export default ProfileUpdate;