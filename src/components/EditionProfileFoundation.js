import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { db } from '../../firebase/initFirebase'
import { foundations } from "../lib/foundations";
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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "@material-ui/core";

const schema = yup.object().shape({
    name: yup.string().required("Ingrese su nombre"),
    last_name: yup.string().required("Ingrese su apellido"),
    email: yup
        .string()
        .email("Ingrese un email válido")
        .required("Ingrese su email."),
    name_foundation: yup.string().required("Ingrese el nombre de la fundación"),
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
        fontSize: 45,
        margin:'10px',
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(5),
        width:'80%',
        backgroundColor: '#5081E5',
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0,2, 2),
        color: "#000000",
        backgroundColor:'#3E54E7',
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        color:'#EC323D',
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
        marginBottom:'12px',
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    papermodal: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor:"#9CBBF2",
      },
    containerbuttons:{
        textAlign:"center",
    },
    buttons:{
        textAlign:"right",
    },
    button1:{
        margin: 6,
        color:"black",
        backgroundColor:"#F06177",
    },
    button2:{
        margin: 6,
        color:"#EC323D",
    },
    father: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right:{
        textAlign:"center",
        paddingRight:'17px',
        paddingLeft:'17px',
    },
    change:{
        backgroundColor:'#3E54E7',
        marginBottom:'24px',
        marginLeft:5
    },
    camera:{
        fontSize: 30,
    },
}));

const EditionProfileFoundation = (props) => {

    const classes = useStyles();
    const [dataUser, setDataUser] = useState()
    const {updateFoundation: doUpdate, savePhotoFoundation, photoFoundation} = foundations();
    const [open, setOpen] = React.useState(false);
    const [updateFile, setUpdateFile] = useState(null);

    const handleuploadImage = async (id, file) => {
        const uploadTask = photoFoundation(id, file).put(file);
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
                        savePhotoFoundation(downloadURL)
                    })
            }
        )
    };
    const handleAddFile = (e) => {
        console.log('image', e)
        if (e !== undefined) {
          if (e.type.includes("image/")) {
            console.log('infoImages', e);
            setUpdateFile(e);
          } else {
            setUpdateFile(null);
          }
        } else {
          setUpdateFile(null);
        }
      };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        db.collection('foundations').doc(`${props.id}`).onSnapshot(function (doc) {
            console.log('datos de usuario', doc.data())
            setDataUser(doc.data())
        })
    }
    useEffect(()=>{
        viewUser();
        return () => {
            setDataUser();
        };
    },[]);
    
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const onSubmit = async (data) => {
        setOpen(false);

        const updateFoundation = {
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            name_foundation: data.name_foundation,
        };
        console.log("Usuario actualizado", updateFoundation);

        try {
            await doUpdate(updateFoundation).then( () => {
                handleuploadImage(props.id, updateFile)
            });

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
        <div className={classes.father}>
            {
                dataUser ?
                <>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.login}>
                        Modificar Perfil
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} className={classes.father}>
                            <div>
                                <Avatar alt="Remy Sharp" src={dataUser.image} className={classes.avatar} />
                                <br/>
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => {
                                        handleAddFile(e.target.files[0]);
                            }}/>
                            <label htmlFor="icon-button-file">
                                <PhotoCamera className={classes.camera}/>
                                {/* <Button className={classes.change}>Cambiar imagen</Button> */}
                            </label>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.right}>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                            
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name_foundation"
                                    defaultValue={dataUser.name_foundation}
                                    {...register('name_foundation', { required: true })}
                                    label="Nombre fundación"
                                    name="name_foundation"
                                    autoComplete="name_foundation"
                                    className={clsx(classes.textField)}
                                />
                                <Typography color="primary">{errors.name_foundation?.message}</Typography>
                            
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
                            
                                <div className={classes.buttons}>
                                <Link href="/foundations">
                                    <Button
                                    className={classes.cancel}
                                    >
                                    Cancelar
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleOpen}
                                >
                                    Guardar Cambios
                                </Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                    timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                    <div className={classes.papermodal}>
                                        <h2 id="transition-modal-title">Confirmación</h2>
                                        <p id="transition-modal-description">¿Quiere guardar los cambios?</p>
                                        <div className={classes.containerbuttons}>
                                        <Button variant="contained" color="primary" className={classes.button1} onClick={handleSubmit(onSubmit)} >
                                            Sí
                                        </Button>
                                        
                                            <Button color="secondary" className={classes.button2} onClick={handleClose}>
                                                No
                                            </Button>
                                        </div>
                                    </div>
                                    </Fade>
                                </Modal>           
                            </div>
                    </form>
                        </Grid>
                    </Grid>
                    
                </div>
            </>
            : "Cargando..."
            }
            </div>
    )
};
export default EditionProfileFoundation;