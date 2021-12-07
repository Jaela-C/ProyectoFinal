import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useAuth} from "../hocs/useAuth";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import Avatar from '@material-ui/core/Avatar';
import Routes from '../constants/routes';

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingrese un email válido")
        .required("Ingrese su email."),
    password: yup.string().required("Ingrese su clave"),
});

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5'
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
        margin: theme.spacing(5, 0, 0),
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
}));

const LoginForm = () => {

    const classes = useStyles();
    const { login } = useAuth();
    const [user, setUser] = useState(null)

    const {register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (value) => {
        await login(value)
        setUser(value)
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar} alt="Ícono de usuario" src="/user_icon.png" />
            <Grid container style={{paddingTop: "30px"}}>
                <Grid item xs={9}>
                    <Typography>¿No tienes una cuenta?</Typography>
                </Grid>
                <Grid item xs={3} style={{textAlign: "end"}}>
                    <Link className={classes.colorLabel} href={Routes.TYPE} variant="body2"  value="regístrate">
                        {"Regístrate"}
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Divider color="secondary"/>
                </Grid>
            </Grid>
            <Grid style={{paddingTop: "30px"}}>
                <Typography component="h1" variant="h5" className={classes.login}>
                    Iniciar Sesión
                </Typography>
            </Grid>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} style={{paddingBottom: "30px"}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    {...register('email', { required: true })}
                    label="Correo"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className={clsx(classes.textField)}
                />

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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                >
                    Iniciar Sesión
                </Button>
            </form>
        </div>
    </Container>
    )
};
export default LoginForm;