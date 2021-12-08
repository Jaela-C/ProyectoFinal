import React, { useState, useEffect } from "react";
import { db } from '../../firebase/initFirebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { admin } from '@/lib/administration';
import { Link } from "@material-ui/core";
import clsx from 'clsx';
import Routes from "../constants/routes";
import emailjs from 'emailjs-com';
import { padding } from "@mui/system";
import { useRouter } from 'next/router'


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5',
    },
    colorLabel: {
        color: "#EC323D"
    },
    title: {
        color: "#FFFFFF",
        fontSize: 40
    },
    textField: {
        width: "-webkit-fill-available",
        backgroundColor: "#9CBBF2",
        borderRadius: "5%"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(8),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        color: "#EC323D",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#FFFFFF",
        backgroundColor: "#3E54E7",
        marginLeft:"15px"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "-webkit-fill-available",
        backgroundColor: "#9CBBF2",
        borderRadius: "5%"
    },
    textFieldDate: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        margin:"11px 0px",
        width: 200,
        borderRadius: "5%",
    },
    root1: {
        margin:"11px 0px",
        display:"flex",
        textAlign: "center"
    },
    input: {
        display: 'none',
    },
    butons:{
        textAlign:"right",
    },
}));

const ViewRequest = (id) => {

    const [request, setRequest] = useState();
    const {updateRolFoundation: doUpdate} = admin();
    const router = useRouter();
    //const [demand, setDemand] = useState(true);
    //const form = useRef();
    const viewUser = () => {
        db.collection('foundations').doc(`${id.id}`).onSnapshot(function (doc) {
            setRequest(doc.data())
        })
    }
    
    // const sendEmail = (e) => {
    //     e.preventDefault();
        
    //         emailjs.send(`service_2nk4s9o`, `template_3ifib2n`, template_params, `user_dX4MpSBcLyTzdoGDkAudb`)
    //           .then((result) => {
    //               console.log(result.text);
    //           }, (error) => {
    //               console.log(error.text);
    //           });
    //   };

    const denial = (email) =>{
        var template_params = {
            "user_email": email,
        }
        emailjs.send(`service_2nk4s9o`, `template_jymi8wv`, template_params, `user_dX4MpSBcLyTzdoGDkAudb`);
        router.push('/administration')
    }
    const updateRolFoundation = (id_foundation, email) => {
        var template_params = {
            "user_email": email,
        }
        try {
            doUpdate(id_foundation);
            emailjs.send(`service_2nk4s9o`, `template_3ifib2n`, template_params, `user_dX4MpSBcLyTzdoGDkAudb`);
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
        viewUser()
    },[id]);
    
    const classes = useStyles();
    return (
        <>
        {
            request ? 
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid style={{paddingTop: "30px"}}>
                        <Typography component="h1" variant="h5" className={classes.title}>
                            Datos de la solicitud
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate style={{paddingBottom: "30px"}}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            className={clsx(classes.textField)}
                            disabled
                            defaultValue={request.name_foundation}
                            id="name"
                            label="Nombre de la fundacion"
                            name="name"
                            autoComplete="text"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            disabled
                            className={clsx(classes.textField)}
                            defaultValue={request.name + ' ' + request.last_name}
                            label="Nombre de usuario"
                            name="username"
                            autoComplete="text"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="user_email"
                            className={clsx(classes.textField)}
                            disabled
                            defaultValue={request.email}
                            label="Correo electrónico"
                            name="user_email"
                            autoComplete="text"
                            autoFocus
                            type="email"
                        />
                        <div className={classes.root1}>
                            <TextField
                                variant="outlined"
                                disabled
                                id="standard-disabled"
                                className={clsx(classes.textField)}
                                defaultValue="Comprobante"
                                fullWidth
                            />
                            <label htmlFor="icon-button-file">
                            <Link href={request.file} target="_blank">
                                <IconButton color="default" component="span">
                                    <RemoveRedEyeIcon/>
                                </IconButton>
                            </Link>
                            </label>
                        </div>
                    
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="state"
                            disabled
                            className={clsx(classes.textField)}
                            defaultValue={request.role == "REQUEST" ? "Por aprobar" : "..."}
                            label="Estado"
                            name="state"
                            type="text"
                            autoFocus                        
                        />
                        <div className={classes.butons}>
                            
                                <Button
                                    className={classes.cancel}
                                    onClick={() => {denial(request.email)}}
                                    //href = {Routes.ADMINISTRATION}
                                >
                                    
                                    Rechazar
                                   
                                </Button>
                            
                            <Button
                                onClick={() => { updateRolFoundation(id.id, request.email) }}
                                variant="contained"
                                className={classes.submit}
                                //type = "submit"
                            >
                                Aprobar
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        : "cargando.."
        }
        </>
    )
};
export default ViewRequest;