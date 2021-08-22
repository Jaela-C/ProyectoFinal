import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { db } from '../../firebase/initFirebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import {yupResolver} from "@hookform/resolvers/yup";
import { useAuth } from '../hocs/useAuth'
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Ingrese su nombre"),
    last_name: yup.string().required("Ingrese su apellido"),
    email: yup
        .string()
        .email("Ingrese un email válido")
        .required("Ingrese su email."),
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#5081E5'
  },
  colorLabel: {
    color: "#EC323D"
  },
  question: {
    color: '#FFFFFF'
  },
  register: {
    color: "#FFFFFF",
    fontSize: 40,
    marginBottom: 15,
    marginTop: 10,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(5, 0, 5),
    backgroundColor: "#FFFFFF",
    width: '150px',
    height: '150px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 8),
    color: "#FFFFFF",
    backgroundColor: "#F06177"
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
    borderRadius: "5%",
    padding: "3%"
  },
}));

const ProfileFoundation = () => {
    const { user } = useAuth();
    const classes = useStyles();
    const [dataUser, setDataUser] = useState()

    const {register, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(schema),
    });
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        password_confirmation: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const viewUser = () => {
        db.collection('foundations').doc(`${user.id}`).onSnapshot(function (doc) {
            console.log('datos de usuario', doc.data())
            setDataUser(doc.data())
        })
    }
    useEffect(()=>{
        if(user){
            viewUser();
        }
    },[user]);

    return (

        <Container component="main" maxWidth="xs" className={classes.container}>
            {
                dataUser ?
                <>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid style={{paddingTop: "30px"}}>
                        <Typography component="h1" variant="h5" className={classes.register}>
                            Perfil
                        </Typography>
                    </Grid>
                    <Avatar className={classes.avatar} alt="Ícono de usuario" src="https://i.pinimg.com/originals/5d/67/98/5d6798b9aea22ca240e63a5b9acb3424.png" />
                    <form className={classes.form} noValidate >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography className={classes.textField} color="primary">{dataUser.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography className={classes.textField} color="primary">{dataUser.last_name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography className={classes.textField} color="primary">{dataUser.email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography className={classes.textField} color="primary">{dataUser.name_foundation}</Typography>
                            </Grid>
                        </Grid>
                        <Link href={`foundations/${user.id}`}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Modificar información
                            </Button>
                        </Link>
                    </form>
                </div>
                </> 
                : "Cargando..."
            }
        </Container>
    );
};

export default ProfileFoundation;