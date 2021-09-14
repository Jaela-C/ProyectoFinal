import { useState } from 'react';
import { db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import firebase from "firebase/app";
import Comments from "@/components/Comments";

export const publications = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [ imageUser, setImageUser ] = useState();

    console.log('user publication', user)

    const photoPublication = (file) => {
        return storage.ref(`/publications/${file}`);
    }

    const savePhotoPublication = async (url, idPublication) => {
        console.log('idPublication', idPublication)
        await db.collection('publications').doc(idPublication).update({
            image: url
        })
    }

    const sendComments = async (dataComments, idPublication) => {
        console.log(idPublication, dataComments)
        try {
            await db.collection('publications').doc(idPublication).update({
                comments: firebase.firestore.FieldValue.arrayUnion(dataComments),
            })
            console.log('dadasdasd', dataComments)
        } catch(e) {
            console.log("Error", e)
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
            //db.collection('foundations').doc(`${user.id}`).onSnapshot(function (doc) {
            //    console.log('datos de usuario registrar publicación', doc.data().image)
            //    setImageUser(doc.data().image);
            //})
            await db.collection('publications').doc().set({
                date_ex: value.date_ex,
                description: value.description,
                last_name: value.last_name,
                name: value.name,
                phone: value.phone,
                title: value.title,
                id_user: user.id,
                image: value.image,
                //image_user: imageUser,
                comments: new Array()
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
        console.log('dataUpdate', value + 'id' + id)
        //db.collection('foundations').doc(`${user.id}`).onSnapshot(function (doc) {
        //    setImageUser(doc.data().image);
        //})
        try{
            await db.collection('publications').doc(id).update({
                date_ex: value.date_ex,
                description: value.description,
                last_name: value.last_name,
                name: value.name,
                phone: value.phone,
                title: value.title,
                id_user: user.id,
                //image_user: imageUser,
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
        deletePublication,
        savePhotoPublication,
        photoPublication,
    };
}