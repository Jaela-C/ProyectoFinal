import { auth, db, storage } from '../../firebase/initFirebase'
import { useAuth } from '../hocs/useAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import image from 'next/image'
import { SignalCellularConnectedNoInternet4BarOutlined } from '@material-ui/icons'

export const users = () => {
    const router = useRouter();
    const { user } = useAuth();
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
        console.log('Daros de usuarios imagen', value)
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
                role: 'USER',
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

    return {
        updateUser,
        deleteUser,
        photoUser,
        savePhotoUser
    };
}