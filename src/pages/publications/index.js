import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardPublication from "@/components/CardPublication";
import Grid from '@material-ui/core/Grid';
import { db } from '../../../firebase/initFirebase';
import { useAuth } from '../../hocs/useAuth';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '1% 7%',
        display: "flex",
        color: "black",

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container:{
        overflow:'hidden',
    },
}));

const publications = () =>{
    const classes = useStyles(); 
    
    const { user, onAuth } = useAuth();
    const listPublications = [];
    const [dataPublications, setDataPublications] = useState([]);
    const handleDelete = async(id) => {
        try {
            await doDelete(id);
        } catch (error) {
            if (error.response) {
                console.error(error.response);
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
    }
    useEffect(()=>{
        onAuth()
        if(user){
            const getPublications = async () => {
                await db.collection('foundations').doc(`${user.uid}`).collection('publications').onSnapshot(publication => {
                    publication.forEach(doc => {
                        const dataPublication = {
                            date_ex: doc.data().date_ex,
                            description: doc.data().description,
                            image: doc.data().image,
                            last_name: doc.data().last_name,
                            name: doc.data().name,
                            phone: doc.data().phone,
                            title: doc.data().title,
                        };
                        listPublications.push({ id: doc.id, ...dataPublication});
                  });
                  setDataPublications(listPublications);
                })
            };
            getPublications();
        }
    },[user]);
    /*const getPublications = async () => {
        await db.collection('foundations').doc(`${user.uid}`).collection('publications').onSnapshot(publication => {
            publication.forEach(doc => {
                const dataPublication = {
                    date_ex: doc.data().date_ex,
                    description: doc.data().description,
                    image: doc.data().image,
                    last_name: doc.data().last_name,
                    name: doc.data().name,
                    phone: doc.data().phone,
                    title: doc.data().title,
                };
                listPublications.push({ id: doc.id, ...dataPublication});
          });
          setDataPublications(listPublications);
        })
    };*/

    console.log('lista publicaciones', dataPublications)

    return(
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.container}>
            {console.log('mensaje 1', dataPublications)}
            {
                dataPublications.map((data) => {
                    console.log('data', data)
                    return(
                        <Grid item xs={6}>
                            <CardPublication props = {data}/>
                        </Grid>
                    );
                })
            }
            </Grid>
        </div>
    );
}
export default publications;