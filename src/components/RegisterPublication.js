import React from "react";
import {useForm} from "react-hook-form";
import {useAuth} from "../hocs/useAuth";
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
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Ingrese un título"),
    responsable: yup
        .string()
        .required("Ingrese el nombre del responsable")
        .matches(/^[aA-zZ\s]+$/, "Solo se permiten letras en este apartado"),
    apellidoresponsable: yup
        .string()
        .required("Ingrese el apellido del responsable")
        .matches(/^[aA-zZ\s]+$/, "Solo se permiten letras en este apartado"),
    contacto: yup
        .number()
        .typeError("Solo use números")
        .positive("Ingrese solo números positivos")
        .integer("Ingrese solo números enteros")
        .required('Ingrese el número de contacto'),
    descripcion: yup
        .string()
        .required("Ingrese una descripción"),
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

const RegisterPublication = () => {

    const classes = useStyles();
    const {login} = useAuth();

    const {register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (value) => {
        await login(value)
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
                <Grid style={{paddingTop: "30px"}}>
                    <Typography component="h1" variant="h5" className={classes.login}>
                        Registrar Publicación
                    </Typography>
                </Grid>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} style={{paddingBottom: "30px"}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        {...register('title', { required: true })}
                        label="Ingrese un título"
                        name="title"
                        autoComplete="text"
                        autoFocus
                        error={!!errors.title}
                        helperText={errors.text?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="responsable"
                        {...register('responsable', { required: true })}
                        label="Ingrese el nombre del responsable"
                        name="responsable"
                        autoComplete="text"
                        autoFocus
                        error={!!errors.responsable}
                        helperText={errors.responsable?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="apellidoresponsable"
                        {...register('apellidoresponsable', { required: true })}
                        label="Ingrese el apellido del responsable"
                        name="apellidoresponsable"
                        autoComplete="text"
                        autoFocus
                        error={!!errors.apellidoresponsable}
                        helperText={errors.apellidoresponsable?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contacto"
                        {...register('contacto', { required: true })}
                        label="Ingrese el numero del contacto"
                        name="contacto"
                        type="numeric"
                        autoFocus
                        error={!!errors.contacto}
                        helperText={errors.contacto?.message}
                    />
                    <TextField
                        id="date"
                        label="Fecha de expiracion"
                        type="date"
                        required
                        defaultValue="2017-05-24"
                        className={classes.textFieldDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="descripcion"
                        label="Ingrese una descripción"
                        multiline
                        required
                        rows={3}
                        variant="outlined"
                        fullWidth
                        name="descripcion"
                        {...register('descripcion', { required: true })}
                        error={!!errors.descripcion}
                        helperText={errors.descripcion?.message}
                    />
                    <div className={classes.root1}>
                        <TextField
                            variant="outlined"
                            disabled
                            id="standard-disabled"
                            defaultValue="Inserte una imagen"
                            fullWidth
                        />
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="default" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Guardar
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.cancel}
                    >
                        Cancelar
                    </Button>
                </form>
            </div>
        </Container>
    )
};
export default RegisterPublication;