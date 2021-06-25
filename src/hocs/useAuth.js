import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, db } from '../../firebase/initFirebase'
import cookie from "js-cookie";
import translateMessage from "../constants/messages";
import { useRouter } from 'next/router'

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

    const handleUser = (user) => {
        if (user) {
            //sesión activa
            setUser(user);
            console.log('sesión activa')
            cookie.set('auth', true, {
                expires: 1, //día
            });
            return user;
        } else {
            //sin sesión activa
            setUser(false);
            cookie.remove('auth');
            console.log('sin sesión activa')
            return false;
        }
      };

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
            await db.collection('requests').doc(userUid.uid).set({
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
            handleUser(response.user)
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
            handleUser(false);
            router.push('/home')
        })
        .catch((e) => {
            console.error(e)
        })
    }

    const getAuthenticatedUser = async () => {
        const userUid = auth.currentUser;
        if(userUid != null){
            console.log('userUid.uid', userUid.displayName)
            handleUser(userUid.uid)
        } else {
            handleUser(false)
            console.log('error')
        }
    }

    useEffect(() => {
        console.log('RENDER AUTH', user);
        try {
            getAuthenticatedUser();
        } catch (error) {
            console.log('No existe el usuario')
        }
    }, []);
    
    return {
        user,
        registerUser,
        registerAdmin,
        login,
        logout,
    };
}