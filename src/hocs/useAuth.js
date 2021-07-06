import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, db } from '../../firebase/initFirebase'
import cookie from "js-cookie";
import translateMessage from "../constants/messages";
import { useRouter } from 'next/router'
import { setUserCookie, removeUserCookie, getUserFromCookie, } from '../../firebase/userCookies'

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

function useAuthProvider() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = auth.onIdTokenChanged((user) => {
            if (user) {
                setUserCookie(user)
                setUser(user)
                console.log('sesión iniciada')
                console.log('user', user)
            } else {
                removeUserCookie()
                setUser()
                console.log('sesión inactiva')
            }
        })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            router.push('/')
            return
        }
        setUser(userFromCookie)

        return () => {
            cancelAuthListener()
        }
    }, [])

      const registerUser = async (value) => {
        console.log(value.email, value.password)
        const userUid = auth.currentUser;
        try{
            await auth.createUserWithEmailAndPassword(value.email, value.password);
            await db.collection('users').doc(userUid.uid).set({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: 'USER'
            })
            .then(
                alert('Los datos se guardaron correctamente'),
                router.push('/publications')
            )
        } catch(e) {
            console.log(e.code)
            if(e.code){
                alert("El email ingresado le pertenece a otra cuenta")
                return e
            }
            return e
        }
    }

    const registerAdmin = async (value) => {
        console.log(value.email, value.password)
        const userUid = auth.currentUser;
        try{
            await auth.createUserWithEmailAndPassword(value.email, value.password);
            await db.collection('foundations').doc(userUid.uid).set({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: 'ADMIN',
                name_foundation: value.name_foundation,
                state: false
            })
            .then(
                alert('La solicitud fue enviada'),
                router.push('/')
            )
        } catch(e) {
            console.log(e.code)
            if(e.code){
                alert("El email ingresado le pertenece a otra cuenta")
                return e
            }
            return e
        }
    }

    const login = async (value) => {
        console.log(value.email, value.password)
        return auth
        .signInWithEmailAndPassword(value.email, value.password)
        .then((response) => {
            console.log('response', response)
            console.log('value.response', value.response)
            console.log('response.value', response.user)
            router.push('/publications')
            return response
        })
        .catch((e) => {
            console.log(e)
            return e
        })
    }

    const logout = async () => {
        auth
        .signOut()
        .then(() => {
            // Sign-out successful.
            router.push('/home')
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return {
        user,
        registerUser,
        registerAdmin,
        login,
        logout,
    };
}