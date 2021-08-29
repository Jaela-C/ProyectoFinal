import { auth, db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'

export const foundations = () => {
    const router = useRouter();
    const { user } = useAuth();

    console.log('user users', user)
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
        console.log('si entra', value)
        try{
            await userA.updateEmail(`${value.email}`).then(() => {
                console.log('Correo actualizado')
            })
            await userA.updatePassword(`${value.password}`).then(() => {
                console.log('Contraseña actualizada')
            })
            await db.collection('foundations').doc(`${user.id}`).update({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                name_foundation: value.name_foundation,
            })
            .then(
                alert('Los datos se modificaron correctamente'),
                router.push('/foundations')
            )
        } catch(e) {
            console.log(e.code)
            if(e.code){
                return e
            }
            return e
        }
    }

    const deleteFoundation = async () => {
        try{
            await db.collection('foundations').doc(`${user.id}`).delete()
            .then(
                alert('El usuario fue eliminado'),
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
        updateFoundation,
        deleteFoundation,
        photoFoundation,
        savePhotoFoundation,
    };
}