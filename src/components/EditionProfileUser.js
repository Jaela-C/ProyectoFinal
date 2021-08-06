import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { db } from '../../firebase/initFirebase'
import { users } from "../lib/users";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useAuth } from '../hocs/useAuth';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

const schema = yup.object().shape({
    name: yup.string().required("Ingrese su nombre"),
    last_name: yup.string().required("Ingrese su apellido"),
    email: yup
        .string()
        .email("Ingrese un email válido")
        .required("Ingrese su email."),
    password: yup.string().required("Ingrese su contraseña").min(8, "La contraseña debe tener al menos 8 caracteres").oneOf([yup.ref("password_confirmation")], "La contraseña debe ser la misma"),
    password_confirmation: yup.string().required("Confirme su contraseña").min(8, "La contraseña debe tener al menos 8 caracteres").oneOf([yup.ref("password_confirmation")], "La contraseña debe ser la misma"),
});

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5',
    },
    colorLabel: {
        color: "#EC323D"
    },
    login: {
        color: "#FFFFFF",
        fontSize: 40
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(8),
    },
    avatar: {
        margin: theme.spacing(3, 0, 0),
        backgroundColor: "#FFFFFF",
        width: '150px',
        height: '150px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#FFFFFF",
        backgroundColor: "#F06177"
    },
    cancel: {
        margin: theme.spacing(0, 0, 2),
        color: "#FFFFFF",
        backgroundColor: "#9CBBF2"
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
}));

const EditionProfileUser = () => {

    const classes = useStyles();
    const { user } = useAuth();
    const [dataUser, setDataUser] = useState()
    const {updateUser: doUpdate} = users();

    const {register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });
    
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const viewUser = () => {
        db.collection('users').doc(`${user.id}`).onSnapshot(function (doc) {
            console.log('datos de usuario', doc.data())
            setDataUser(doc.data())
        })
    }
    useEffect(()=>{
        if(user){
            viewUser();
        }
    },[user]);
    
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const onSubmit = async (data) => {
        console.log("data", data);

        const updateUser = {
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        };
        console.log("Usuario actualizado", updateUser);

        try {
            const userData = await doUpdate(data);

            console.log("userData", userData);

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
    };
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            {
                dataUser ?
                <>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid style={{paddingTop: "30px"}}>
                        <Typography component="h1" variant="h5" className={classes.register}>
                            Modificar Perfil
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    defaultValue={dataUser.name}
                                    {...register('name', { required: true })}
                                    label="Nombre"
                                    autoFocus
                                    className={clsx(classes.textField)}
                                />
                                <Typography color="primary">{errors.name?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="last_name"
                                    defaultValue={dataUser.last_name}
                                    {...register('last_name', { required: true })}
                                    label="Apellido"
                                    name="last_name"
                                    autoComplete="lname"
                                    className={clsx(classes.textField)}
                                />
                                <Typography color="primary">{errors.last_name?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    defaultValue={dataUser.email}
                                    {...register('email', { required: true })}
                                    label="Correo"
                                    name="email"
                                    autoComplete="email"
                                    className={clsx(classes.textField)}
                                />
                                <Typography color="primary">{errors.email?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={clsx(classes.textField)} variant="outlined">
                                    <InputLabel htmlFor="password">Contraseña *</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        {...register('password', { required: true })}
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={93}
                                    />
                                </FormControl>
                                <Typography color="primary">{errors.password?.message}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={clsx(classes.textField)} variant="outlined">
                                    <InputLabel htmlFor="password_confirmation">Confirmar Contraseña *</InputLabel>
                                    <OutlinedInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        {...register('password_confirmation', { required: true })}
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password_confirmation}
                                        onChange={handleChange('password_confirmation')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={175}
                                    />
                                </FormControl>
                                <Typography color="primary">{errors.password_confirmation?.message}</Typography>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Guardar Cambios
                        </Button>
                    </form>
                </div>
            </>
            : "Cargando..."
            }
        </Container>
    )
};
export default EditionProfileUser;