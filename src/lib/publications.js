import { db } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'

export const publications = () => {
    const router = useRouter();
    const { user, onAuth } = useAuth();

    onAuth()
    console.log('user publication', user)
    const registerPublication = async (value) => {
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
    
    const updatePublication = async (value, id) => {
        try{
            await db.collection('foundations').doc(`${user.uid}`).collection('publications').doc(id).update({
                date_ex: value.date_ex,
                description: value.description,
                image: 'image.png',
                last_name: value.last_name,
                name: value.name,
                phone: value.phone,
                title: value.title
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
        try{
            await db.collection('foundations').doc(`${user.uid}`).collection('publications').doc(id).delete()
            .then(
                alert('La publicación fue eliminada'),
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
        registerPublication,
        updatePublication,
        deletePublication
    };
}