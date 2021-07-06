import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardPublication from "@/components/CardPublication";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
}));

const publications = () =>{
    const classes = useStyles();    
    return(
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CardPublication/>
                </Grid>
            </Grid>
        </div>
    );
}
export default publications;