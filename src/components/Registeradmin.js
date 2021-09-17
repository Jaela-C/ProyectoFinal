import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { useAuth } from "../hocs/useAuth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import {yupResolver} from "@hookform/resolvers/yup";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Ingrese su nombre"),
    last_name: yup.string().required("Ingrese su apellido"),
    email: yup
        .string()
        .email("Ingrese un email válido")
        .required("Ingrese su email."),
    password: yup.string().required("Ingrese su contraseña").min(8, "La contraseña debe tener al menos 8 caracteres").oneOf([yup.ref("password_confirmation")], "La contraseña debe ser la misma"),
    password_confirmation: yup.string().required("Confirme su contraseña").min(8, "La contraseña debe tener al menos 8 caracteres").oneOf([yup.ref("password_confirmation")], "La contraseña debe ser la misma"),
    name_foundation: yup.string().required("Ingrese el nombre de la fundación"),
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
  root1: {
    margin:"11px 0px",
    display:"flex",
    textAlign: "center"
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
    borderRadius: "5%"
  },
  input: {
    display: 'none',
},
}));


const Registeradmin = () => {
    
    const classes = useStyles();
    const {registerAdmin: doRegister, fileAdmin} = useAuth();
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
    const [updateFile, setUpdateFile] = useState(null);
    const [checkValues, setCheckValues] = useState(false);
    const [url, setUrl] = useState(null);
    
    const handleuploadImage = async (file) => {
        const uploadTask = fileAdmin(file).put(file);
        await uploadTask.on(
            "state_changed",
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Imagen está ' + progress + '% subida');
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
        console.log('image', e.type)
        if (e !== undefined) {
          if (e.type.includes("application/pdf")) {
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

    const onSubmit = async (data) => {
        console.log("data", data);

        const newUser = {
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            name_foundation: data.name_foundation,
            file: url
        };
        console.log("Nuevo usuario", newUser);

        try {
            await doRegister(newUser);

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

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Grid container style={{paddingTop: "30px"}}>
                    <Grid item xs={6}>
                        <Typography className={classes.question}>¿Ya tienes una cuenta?</Typography>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: "end"}}>
                        <Link href="/login" variant="body2" className={classes.colorLabel}>
                            {"Inicia Sesión"}
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider color="secondary"/>
                    </Grid>
                </Grid>
                <Grid style={{paddingTop: "30px"}}>
                    <Typography component="h1" variant="h5" className={classes.register}>
                        Registrarse
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name_foundation"
                                {...register('name_foundation', { required: true })}
                                label="Fundación"
                                name="name_foundation"
                                autoComplete="fname"
                                className={clsx(classes.textField)}
                            />
                            <Typography color="primary">{errors.name_foundation?.message}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <div className={classes.root1}>
                            <TextField
                                variant="outlined"
                                disabled
                                id="standard-disabled"
                                defaultValue="Inserte un comprobante"
                                fullWidth
                                className={clsx(classes.textField)}
                            />
                            <input accept="file/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => {
                                            handleAddFile(e.target.files[0]);
                                }}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="default" aria-label="upload picture" component="span">
                                <FileCopyIcon />
                                </IconButton>
                            </label>
                        </div>    
                        </Grid>
                    </Grid>
                    { checkValues ? (
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                            Registrar
                        </Button>
                    )
                    : <div></div>
                    }
                </form>
            </div>
        </Container>
    );
};

export default Registeradmin;