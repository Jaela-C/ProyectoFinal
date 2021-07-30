import { auth, db } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'

export const admin = () => {
    const router = useRouter();
    const { user } = useAuth();

    console.log('user admin', user)
    const userA = auth.currentUser

    //PARA OBTENER LISTA DE PERFILES DE FUNDACIONES
    // const [dataFoundations, setDataFoundations] = useState([]);
    // const listFoundations = [];
    // const getFoundations = async () => {
    //     await db.collection('foundations').onSnapshot(foundation => {
    //         foundation.forEach(doc => {
    //             const dataFoundation = {
    //                 email: doc.data().email
    //                 last_name: doc.data().last_name,
    //                 name: doc.data().name,
    //                 name_foundation: doc.data().name_foundation
    //             };
    //             listFoundations.push({ id: doc.id, ...dataFoundation});
    //       });
    //       setDataFoundations(listFoundations);
    //     })
    // };

    //PARA OBTENER LISTA DE PERFILES DE USUARIOS
    // const [dataUsers, setDataUsers] = useState([]);
    // const listUsers = [];
    // const getUsers = async () => {
    //     await db.collection('users').onSnapshot(user => {
    //         user.forEach(doc => {
    //             const dataUsers = {
    //                 email: doc.data().email
    //                 last_name: doc.data().last_name,
    //                 name: doc.data().name,
    //                 role: doc.data().role
    //             };
    //             listUsers.push({ id: doc.id, ...dataUsers});
    //       });
    //       setDataUsers(listUsers);
    //     })
    // };

    const updateUser = async (value) => {
        try{
            await userA.updateEmail(`${value.email}`).then(() => {
                console.log('Correo actualizado')
            })
            await userA.updatePassword(`${value.password}`).then(() => {
                console.log('Contraseña actualizada')
            })
            await db.collection('users').doc(`${user.id}`).update({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: 'USER'
            })
            .then(
                alert('Los datos se modificaron correctamente'),
                router.push('/users')
            )
        } catch(e) {
            console.log(e.code)
            if(e.code){
                return e
            }
            return e
        }
    }

    const updateFoundation = async (value) => {
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
                rol: {
                    admin: true
                },
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

    const deleteUser = async () => {
        try{
            await db.collection('users').doc(`${user.id}`).delete()
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
        updateUser,
        updateFoundation,
        deleteUser,
        deleteFoundation
    };
}