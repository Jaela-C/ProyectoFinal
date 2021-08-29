import { db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import firebase from "firebase/app";
import Comments from "@/components/Comments";

export const publications = () => {
    const router = useRouter();
    const { user } = useAuth();

    console.log('user publication', user)

    const sendComments = async (dataComments, idPublication) => {
        try {
            await db.collection('publications').doc(idPublication).update({
                comments: firebase.firestore.FieldValue.arrayUnion(dataComments),
            })
        } catch(e) {
            console.log(e.code)
            if(e.code){
                return e
            }
            return e
        }
    }

    const registerPublication = async (value) => {
        console.log('valor', value)
        try{
            await db.collection('publications').doc().set({
                date_ex: value.date_ex,
                description: value.description,
                image: 'image.png',
                last_name: value.last_name,
                name: value.name,
                phone: value.phone,
                title: value.title,
                id_user: user.id
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
    
    const updatePublication = async (value, id) => {
        try{
            await db.collection('publications').doc(id).update({
                date_ex: value.date_ex,
                description: value.description,
                image: 'image.png',
                last_name: value.last_name,
                name: value.name,
                phone: value.phone,
                title: value.title,
                id_user: user.id
            })
            .then(
                alert('Los datos se modificaron correctamente'),
            )
            router.push('/publications')
        } catch(e) {
            console.log(e.code)
            if(e.code){
                return e
            }
            return e
        }
    }

    const deletePublication = async (id) => {
        console.log('doc publication delete', id)
        try{
            await db.collection('publications').doc(id).delete()
            .then(
                //alert('La publicación fue eliminada'),
                router.push('/publications'),
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
        sendComments,
        registerPublication,
        updatePublication,
        deletePublication
    };
}