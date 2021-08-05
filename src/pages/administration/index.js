import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Block } from '@material-ui/icons';
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

    return(
        <div className={classes.root}>
            <div className={classes.title}>
                <b>Nuevas solicitudes</b>
            </div>
            <div>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={6} sm={3}>
                    <Request/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Request/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Request/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Request/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Request/>
                </Grid>
            </Grid>
            </div>
            
        </div>
    );
}
export default administration;