import React, {createContext, useContext, useEffect, useState} from 'react';
import { auth, db, storage } from '../../firebase/initFirebase'
import { useRouter } from 'next/router'
import translateMessage from '../utils/translateMessage';
import { useSnackbar } from 'notistack';

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function useAuthProvider() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleUser = (user) => {
        if (user) {
            setUser(user);
            return user;
        } else {
            setUser(false);
            return false;
        }
    };

    const registerUser = async (value) => {
        try{
            await auth.createUserWithEmailAndPassword(value.email, value.password);
            await db.collection('users').doc(auth.currentUser.uid).set({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: "USER",
                image: ""
            })
            .then(
                enqueueSnackbar('Los datos se guardaron correctamente', {
                    variant: "success",
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

    const fileAdmin = (file) => {
        return storage.ref(`/request/${file.name}--${new Date}`);
    }

    const registerAdmin = async (value) => {
        try{
            await auth.createUserWithEmailAndPassword(value.email, value.password);
            await db.collection('foundations').doc(auth.currentUser.uid).set({
                email: value.email,
                name: value.name,
                last_name: value.last_name,
                role: "REQUEST",
                name_foundation: value.name_foundation,
                image: "",
                file: value.file
            })
            .then(
                enqueueSnackbar('La fundación se ha registrado correctamente, su perfil será aprobado en un lapso de 24 horas.', {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                }),
                router.push('/')
            )
        } catch(e) {
            enqueueSnackbar(translateMessage(error.code), {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
            return e
        }
    }

    async function login(data) {
        try {
            const value = await auth.signInWithEmailAndPassword(data.email, data.password)
            const infoUser = await db.collection('users').doc(value.user.uid).get()
            if(!infoUser.exists){
                const infoFoundation = await db.collection('foundations').doc(value.user.uid).get()
                if(!infoFoundation.exists){
                    const infoAdmin = await db.collection('admin').doc(value.user.uid).get()
                    const userData = { id: value.user.uid, ...infoAdmin.data()}
                    handleUser(userData)
                    router.push('/administration')
                }
                else {
                    const userData = { id: value.user.uid, ...infoFoundation.data()}
                    handleUser(userData)
                    router.push('/publications')
                }
            }
            else {
                const userData = { id: value.user.uid, ...infoUser.data()}
                handleUser(userData)
                router.push('/publications')
            }
        } catch (error) {
            handleUser(false);
            enqueueSnackbar(translateMessage(error.code), {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
            throw error;
        }
    }

    async function logout() {
        try {
            await auth.signOut().then(() => {
                router.push('/')
            });
            handleUser(false);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        const subscribeUser = auth.onAuthStateChanged(async (userAuthData) => {
          if (userAuthData) {
            const userInf = await db
              .collection('users')
              .doc(userAuthData.uid)
              .get();
              if(userInf.exists){
                const userData = { id: userAuthData.uid, ...userInf.data()};
                handleUser(userData);
              }
              else {
                  subscribeAdmin();
              }
          } else {
            handleUser(false);
          }
        });

        const subscribeFoundation = auth.onAuthStateChanged(async (userAuthData) => {
            if (userAuthData) {
              const userAdmin = await db
                .collection('foundations')
                .doc(userAuthData.uid)
                .get();
                if(userAdmin.exists){
                    const userData = { id: userAuthData.uid, ...userAdmin.data()};
                    handleUser(userData);
                  }
                  else {
                      subscribeUser();
                  }
            } else {
              handleUser(false);
            }
        });
        
        const subscribeAdmin = auth.onAuthStateChanged(async (userAuthData) => {
            if (userAuthData) {
              const userAdmin = await db
                .collection('admin')
                .doc(userAuthData.uid)
                .get();
                if(userAdmin.exists){
                    const userData = { id: userAuthData.uid, ...userAdmin.data()};
                    handleUser(userData);
                  }
                  else {
                      subscribeUser();
                  }
            } else {
              handleUser(false);
            }
        });

        return () => {
          subscribeUser();
          subscribeAdmin();
          subscribeFoundation();
        };
      }, []);

    return {
        user,
        registerUser,
        registerAdmin,
        login,
        fileAdmin,
        logout,
    };
}