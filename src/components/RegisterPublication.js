import React, { useState } from "react";
import {useForm} from "react-hook-form";
import { publications } from "../lib/publications";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import * as moment from 'moment';
import { useSnackbar } from 'notistack';

const today = new Date();

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Ingrese un título")
        .matches(/^[A-Za-záéíóúáéíóúÁÉÍÓÚñÑ]+[A-Za-záéíóúáéíóúÁÉÍÓÚñÑ ]+$/, 'Ingrese un título válido'),
    name: yup
        .string()
        .required("Ingrese el nombre del responsable")
        .matches(/^[A-Za-záéíóúáéíóúÁÉÍÓÚñÑ]+$/, 'Ingrese un nombre válido'),
    last_name: yup
        .string()
        .required("Ingrese el apellido del responsable")
        .matches(/^[A-Za-záéíóúáéíóúÁÉÍÓÚñÑ]+$/, 'Ingrese un apellido válido'),
    phone: yup
        .string()
        .required('Ingrese el número de contacto')
        .matches(/^[1-9]{1}[0-9]{8}/, "El número ingresado es incorrecto, el número no debe empezar con 0"),
    description: yup
        .string()
        .required("Ingrese una descripción")
        .matches(/^[A-Za-záéíóúáéíóúÁÉÍÓÚñÑ]+[A-Za-záéíóúáéíóúÁÉÍÓÚñÑ0-9 ]+$/, 'Ingrese una descripción válida'),
    date_ex: yup
        .date()
        .required("La fecha es requerida")
        .min(today, "Ingrese una fecha válida")
});

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5',
    },
    textField: {
        width: "-webkit-fill-available",
        backgroundColor: "#9CBBF2",
        borderRadius: "5%"
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
        backgroundColor: "#9CBBF2",
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
    const {registerPublication: doRegister, photoPublication} = publications();
    const [updateFile, setUpdateFile] = useState(null);
    const [checkValues, setCheckValues] = useState(false);
    const [url, setUrl] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleuploadImage = async (file) => {
        const uploadTask = photoPublication(file).put(file);
        await uploadTask.on(
            "state_changed",
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function (error) {
                console.log(error);
            },
            function (){
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(async function (downloadURL) {
                        console.log('Imagen disponible', downloadURL)
                        setCheckValues(true)
                        setUrl(downloadURL)
                    })
            }
        )
    };
    const handleAddFile = (e) => {
        console.log('image', e)
        if (e !== undefined) {
          if (e.type.includes("image/")) {
            console.log('infoImages', e);
            handleuploadImage(e);
            setUpdateFile(e);
          } else {
            setUpdateFile(null);
          }
        } else {
          setUpdateFile(null);
        }
        
      };

    const {register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const onCancel = async () => {
        enqueueSnackbar('Los datos no se guardaron', {
            variant: "info",
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        })
    };

    const onSubmit = async (data) => {
        const date = moment(data.date_ex).format('YYYY-MM-DD')
        const newPublication = {
            date_ex: date,
            description: data.description,
            last_name: data.last_name,
            name: data.name,
            phone: data.phone,
            title: data.title,
            image: url
        };

        try {
            await doRegister(newPublication)

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
            <CssBaseline/>
            <div className={classes.paper}>
                <Grid style={{paddingTop: "30px"}}>
                    <Typography component="h1" variant="h5" className={classes.login}>
                        Registrar Publicación
                    </Typography>
                </Grid>
                <form className={classes.form} noValidate style={{paddingBottom: "30px"}} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        className={clsx(classes.textField)}
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
                        className={clsx(classes.textField)}
                        id="name"
                        {...register('name', { required: true })}
                        label="Ingrese el nombre del responsable"
                        name="name"
                        autoComplete="text"
                        autoFocus
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        className={clsx(classes.textField)}
                        id="last_name"
                        {...register('last_name', { required: true })}
                        label="Ingrese el apellido del responsable"
                        name="last_name"
                        autoComplete="text"
                        autoFocus
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        className={clsx(classes.textField)}
                        id="phone"
                        {...register('phone', { required: true })}
                        label="Ingrese el numero del contacto"
                        name="phone"
                        type="numeric"
                        autoFocus
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                    <TextField
                        id="date_ex"
                        {...register('date_ex', { required: true })}
                        label="Fecha de expiracion"
                        type="date"
                        required
                        defaultValue="2017-05-24"
                        className={classes.textFieldDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        error={!!errors.date_ex}
                        helperText={errors.date_ex?.message}
                    />

                    <TextField
                        id="description"
                        label="Ingrese una descripción"
                        multiline
                        required
                        className={clsx(classes.textField)}
                        rows={3}
                        variant="outlined"
                        fullWidth
                        name="description"
                        {...register('description', { required: true })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <div className={classes.root1}>
                        <TextField
                            variant="outlined"
                            disabled
                            className={clsx(classes.textField)}
                            id="standard-disabled"
                            defaultValue="Inserte una imagen"
                            fullWidth
                        />
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => {
                                        handleAddFile(e.target.files[0]);
                            }}/>
                        <label htmlFor="icon-button-file">
                            <IconButton color="default" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <>
                    { checkValues ? (
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        >
                            Guardar
                        </Button>
                    )
                    : <div></div>
                    }
                    </>
                    <Button
                        onSubmit={handleSubmit(onCancel)}
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