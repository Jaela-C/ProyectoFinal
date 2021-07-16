import React, {createContext, useContext, useEffect, useState} from "react";
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
            // si tengo sesión activa
            setUser(user);
            cookie.set("auth", true, {
                expires: 1/24, // 1 hora
            });
            console.log('sesión iniciada', user)
            return user;
        } else {
            setUser(false);
            cookie.remove("auth");
            return false;
        }
    };

    const registerUser = async (value) => {
        console.log(value.email, value.password)
        try{
            await auth.createUserWithEmailAndPassword(value.email, value.password);
            await db.collection('users').doc(auth.currentUser.uid).set({
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
        try{
            await auth.createUserWithEmailAndPassword(value.email, value.password);
            await db.collection('requests').doc(auth.currentUser.uid).set({
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

    async function login(data) {
        try {
            const response = await auth.signInWithEmailAndPassword(data.email, data.password);
            console.log('response login-response', response)
            console.log('response login', response.user)
            router.push('/publications')
            return response;
        } catch (error) {
            if (error.response) {
                alert(translateMessage(error.response.data.message));
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    async function logout() {
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

    const onAuth = () => {
        return auth.onAuthStateChanged(user => {
            console.log('user onAuth', user)
            handleUser(user)
        });
    }

    return {
        user,
        registerUser,
        registerAdmin,
        login,
        logout, onAuth
    };
}