import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { db } from '../../../firebase/initFirebase';
import { useAuth } from '../../hocs/useAuth';
import Request from '@/components/Request';

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
    const listRequest = [];
    const [dataRequest, setDataRequest] = useState([]);
    
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
        if(user){
            const getRequest = async () => {
                await db.collection('foundations').onSnapshot(request => {
                    request.forEach(doc => {
                        listRequest.push({ id: doc.id, ...doc.data()});
                  });
                  setDataRequest(listRequest);
                })
            };
            if(user.role == 'SUPERADMIN'){
                console.log("funciona")
                getRequest();
            }
        }
    },[user]);

    return(
        <div className={classes.root}>
            <div className={classes.title}>
                <b>Nuevas solicitudes</b>
            </div>
            <div className={classes.root}>
            <Grid container spacing={2} className={classes.container}>
            {
                dataRequest.map((data, index) => {
                    if(data.role == "REQUEST") {
                        return(
                            <Grid item xs={6}
                                key={index}
                            >
                                <Request props = {data}/>
                            </Grid>
                        );
                    }
                })
            }
            </Grid>
        </div>
        </div>
    );
}
export default administration;