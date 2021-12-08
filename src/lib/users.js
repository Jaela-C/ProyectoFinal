import { auth, db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import translateMessage from '../utils/translateMessage';
import { useSnackbar } from 'notistack';

export const users = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const userA = auth.currentUser

    const photoUser = (id, file) => {
        return storage.ref(`/usersimage/${id}`);
    }

    const savePhotoUser = async (url) => {
        await db.collection('users').doc(`${user.id}`).update({
            image: url
        })
    }

    const updateUser = async (value) => {
        console.log('adasd', value)
        try{
            await db.collection('users').doc(`${user.id}`).update({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: 'USER',
            })
            .then(
                enqueueSnackbar('Los datos se modificaron correctamente', {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/users')
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

    const deleteUser = async () => {
        try{
            await db.collection('users').doc(`${user.id}`).delete()
            .then(
                enqueueSnackbar('El usuario ha sido eliminado', {
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
        updateUser,
        deleteUser,
        photoUser,
        savePhotoUser
    };
}