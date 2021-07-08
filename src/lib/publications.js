import { useState } from 'react';
import { auth, db } from '../../firebase/initFirebase'

import { useRouter } from 'next/router'

export const publications = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const registerPublication = async (value) => {
        const user = await auth.currentUser;
        try{
            await db.collection('foundations').doc(`${user.uid}`).collection('publications').doc().set({
                date_ex: value.date_ex,
                description: value.description,
                image: 'image.png',
                last_name: value.last_name,
                name: value.name,
                phone: value.phone,
                title: value.title
            })
            .then(
                alert('Los datos se guardaron correctamente'),
                router.push('/publications')
            )
        } catch(e) {
            console.log(e.code)
            if(e.code){
                return e
            }
            return e
        }
    }
    
    return {
        user,
        registerPublication,
    };
}