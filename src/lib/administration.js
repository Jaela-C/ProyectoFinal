import { auth, db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import translateMessage from '../utils/translateMessage';
import { useSnackbar } from 'notistack';

export const admin = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const userA = auth.currentUser

    const updateUser = async (value) => {
        try{
            await userA.updateEmail(`${value.email}`).then(() => {
            })
            await userA.updatePassword(`${value.password}`).then(() => {
            })
            await db.collection('users').doc(`${user.id}`).update({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: 'USER'
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

    const updateRolFoundation = async (id) => {
        try{
            await db.collection('foundations').doc(`${id}`).update({
                role: 'ADMIN',
            })
            .then(
                enqueueSnackbar('La fundación ha sido aprobada', {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/administration')
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

    const deleteUser = async (id) => {
        try{
            await db.collection('users').doc(`${id}`).delete()
            .then(
                enqueueSnackbar('El usuario ha sido eliminado', {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/administration/profiles')
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

    const deleteFoundation = async (id) => {
        try{
            await db.collection('foundations').doc(`${id}`).delete()
            .then(
                enqueueSnackbar('La fundación se ha eliminado', {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/administration/profiles')
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
        updateRolFoundation,
        deleteUser,
        deleteFoundation
    };
}