import { auth, db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import translateMessage from '../utils/translateMessage';
import { useSnackbar } from 'notistack';

export const foundations = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const userA = auth.currentUser

    const photoFoundation = (id, file) => {
        return storage.ref(`/foundations/${id}`);
    }

    const savePhotoFoundation = async (url) => {
        await db.collection('foundations').doc(`${user.id}`).update({
            image: url
        })
    }

    const updateFoundation = async (value) => {
        try{
            await db.collection('foundations').doc(`${user.id}`).update({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                name_foundation: value.name_foundation,
            })
            .then(
                enqueueSnackbar('Los datos se modificaron correctamente', {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/foundations')
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

    const deleteFoundation = async () => {
        try{
            await db.collection('foundations').doc(`${user.id}`).delete()
            .then(
                enqueueSnackbar('La publicación ha sido eliminada', {
                    variant: "info",
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

    return {
        updateFoundation,
        deleteFoundation,
        photoFoundation,
        savePhotoFoundation,
    };
}