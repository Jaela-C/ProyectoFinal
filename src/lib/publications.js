import { useState } from 'react';
import { db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import firebase from "firebase/app";
import Comments from "@/components/Comments";
import translateMessage from '../utils/translateMessage';
import { useSnackbar } from 'notistack';

export const publications = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [ imageUser, setImageUser ] = useState();

    const photoPublication = (file) => {
        return storage.ref(`/publications/${file}`);
    }

    const savePhotoPublication = async (url, idPublication) => {
        await db.collection('publications').doc(idPublication).update({
            image: url
        })
    }

    const sendComments = async (dataComments, idPublication) => {
        try {
            await db.collection('publications').doc(idPublication).update({
                comments: firebase.firestore.FieldValue.arrayUnion(dataComments),
            })
        } catch(e) {
            enqueueSnackbar(translateMessage(e.code), {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
            return e
        }
    }

    const registerPublication = async (value) => {
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
                enqueueSnackbar('Los datos se guardaron correctamente', {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/publications')
            )
        } catch(e) {
            enqueueSnackbar(translateMessage(e.code), {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
            return e
        }
    }
    
    const updatePublication = async (value, id) => {
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
                image: value.image,
                //image_user: imageUser,
            })
            .then(
                enqueueSnackbar('Los datos se modificaron correctamente', {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
            )
            router.push('/publications')
        } catch(e) {
            enqueueSnackbar(translateMessage(e.code), {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
            return e
        }
    }

    const deletePublication = async (id) => {
        try{
            await db.collection('publications').doc(id).delete()
            .then(
                enqueueSnackbar('La publicación ha sido eliminada', {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/publications'),
            )
        } catch(e) {
            enqueueSnackbar(translateMessage(e.code), {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
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