import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Users from '@/components/Users';
import { db } from '../../../../firebase/initFirebase';
import { useAuth } from '../../../hocs/useAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '1% 7%',
        color: "black",

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title:{
        width: '100%',
        textAlign:'center',
        borderBottom: '1px solid black',
        fontSize: 'x-large',
    },
    container: {
        padding:5
    },
}));

const administration = () =>{
    const classes = useStyles(); 
    const { user } = useAuth();
    const listProfiles = [];
    const [dataProfile, setDataProfile] = useState([]);
    const listFoudantions = [];
    const [dataFoundation, setDataFoundation] = useState([]);

    useEffect(()=>{
        if(user){
            const getProfiles = async () => {
                await db.collection('foundations').onSnapshot(request => {
                    request.forEach(doc => {
                        listFoudantions.push({ id: doc.id, ...doc.data()});
                  });
                  setDataFoundation(listFoudantions);
                })
            };
            const getFoundations = async () => {
                await db.collection('users').onSnapshot(request => {
                    request.forEach(doc => {
                        listProfiles.push({ id: doc.id, ...doc.data()});
                  });
                  setDataProfile(listProfiles);
                }) 
            };
            if(user.role == 'SUPERADMIN'){
                getProfiles();
                getFoundations();
            }
        }
    },[user]);

    return(
        <div className={classes.root}>
            <div className={classes.title}>
                <b>Perfiles</b>
            </div>
            <div className={classes.root}>
            <Grid container spacing={2} className={classes.container}>
            {
                dataProfile.map((data) => {
                    return(
                        <Grid item xs={6}>
                            <Users props = {data}/>
                        </Grid>
                    );
                })
            }
            {
                dataFoundation.map((data) => {
                    return(
                        <Grid item xs={6}>
                            <Users props = {data}/>
                        </Grid>
                    );
                })
            }
            </Grid>
        </div>
            
        </div>
    );
}
export default administration;