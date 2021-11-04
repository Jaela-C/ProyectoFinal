import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Comments from "@/components/Comments";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import DeleteIcon from '@material-ui/icons/Delete';
import { publications } from "../lib/publications";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Router from 'next/router';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/hocs/useAuth";
import EditIcon from '@material-ui/icons/Edit';

const schema = yup.object().shape({
    content: yup
        .string()
        .required("Ingrese un comentario"),
});

const useStyles = makeStyles((theme) => ({
    root: {
        overflow:"hidden",
        height:'100%',
        textAlign:"left",
        backgroundColor: '#5081E5',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    description: {
        overflowY:"scroll",
        width: '100%',
        height: '130px',
        backgroundColor:'#9CBBF2',
        padding:2,
    },
    media: {
        height: 140,
    },
    container:{
        height: '100%',
        position:"relative",

    },
    image:{
        minHeight:'50%',
        maxHeight:'50%',
        minWidth:'100%',
    },
    left:{
        borderRight: '1px solid white',
        padding:10,
    },
    avatar:{
        padding:'0px',
        borderBottom:'1px solid white',
    },
    right:{
        padding:10,
    },
    message:{
        overflow:"hidden",
        height:'400px',
        width:'100%',
        overflowY:"scroll",
        padding:8,
    },
    input:{
        margin:4,
        width:'70%',
        maxWidth:'80%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    modalpaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor:"#9CBBF2",
      },
    containerbuttons:{
        textAlign:"center",
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
}));


const ViewPublication =(props)=>{

    const classes = useStyles();
    const {deletePublication: doDelete, sendComments: comments} = publications();
    const [open, setOpen] = React.useState(false);
    const dataComments = props.props.props.comments;
    const { user } = useAuth();
    const URLPhone = "https://api.whatsapp.com/send?phone=593" + props.props.props.phone + "&text=Hola%20" + props.props.props.name + ",%20quiero%20ayudar!";

    const {register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async(id) => {
        try {
            await doDelete(id);
            Router.reload(window.location.pathname);
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

    const onComment = async(data, id) => {
        if(props.props.props.image_user !== undefined){
                const newComment = {
                    name_user: user.name,
                    content: data.content,
                    id_user: user.id,
                    last_name_user: user.last_name,
                    date: Date(),
                    image: props.props.props.image_user
                };
                const id_publication = props.props.props.id;
                try {
                    await comments(newComment, id_publication);
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
            
        } else {
                const newComment = {
                    name_user: user.name,
                    content: data.content,
                    id_user: user.id,
                    last_name_user: user.last_name,
                    date: Date(),
                };
                const id_publication = props.props.props.id;
                try {
                    await comments(newComment, id_publication);
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
        Router.reload(window.location.pathname);
    }

     const optionAdmin = () => {
        if(user.role == "ADMIN"){
            return(
                <>
                <Link href={`publications/foundations/update/${props.props.props.id}`}>
                            <IconButton aria-label="contactar con la fundación">
                                <EditIcon/>
                            </IconButton>
                        </Link>
                        <IconButton aria-label="Eliminar publicacion" onClick={handleOpen}>
                            <DeleteIcon/>
                        </IconButton>
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
                            <div className={classes.modalpaper}>
                                <h2 id="transition-modal-title">Confirmación</h2>
                                <p id="transition-modal-description">¿Esta seguro de borrar esta publicación?</p>
                                <div className={classes.containerbuttons}>
                                <Button variant="contained" color="primary" className={classes.button1} onClick={() => {handleDelete(props.props.props.id)}}>
                                    Sí
                                </Button>
                                
                                    <Button color="secondary" className={classes.button2} onClick={handleClose}>
                                        No
                                    </Button>
                                </div>
                            </div>
                            </Fade>
                        </Modal>
                        </>
            );
        } else{
            return(
            <IconButton aria-label="contactar con la fundacion" href={URLPhone} target="_blank">
                <WhatsAppIcon/>
            </IconButton>
            );
            
        }
    }

    return (
        <div className={classes.root} key={props.id}>
            <Grid container spacing={0} className={classes.container}>
                <Grid item xs={12} sm={6} className={classes.left}>
                {
                    props.props.props.image ?
                    <Image
                        src={props.props.props.image}
                        alt="Imagen de publicación"
                        width={500}
                        height={300}
                    />
                    : <Image
                        src="/logo.jpeg"
                        alt="Imagen de publicación"
                        width={500}
                        height={300}
                    />
                }
                    <Typography variant="subtitle2" gutterBottom>
                        Vence:{props.props.props.date_ex}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Responsable:{props.props.props.name} {props.props.props.last_name}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Contacto:{props.props.props.phone}
                    </Typography>
                    <div className={classes.description}>
                    {props.props.props.description}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.right}>
                    <ListItem className={classes.avatar}>
                        <ListItemAvatar>
                        {
                            props.props.props.image_user ?
                                <Avatar alt="Remy Sharp" src={props.props.props.image_user} />
                            : <Avatar alt="Remy Sharp" src="/avatar.png" />
                        }
                        </ListItemAvatar>
                        <ListItemText primary={props.props.props.name} secondary={props.props.props.title} />
                    </ListItem>
                    <div className={classes.message}>
                    {dataComments.map((data, index) => (
                        <ListItem key={index} className={classes.avatar}>
                            <ListItemAvatar>
                                <Avatar alt="Usuario" src={user.image} />
                            </ListItemAvatar>
                            <ListItemText primary={data.name_user} secondary={data.content} />
                        </ListItem>
                    ))}
                    </div>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onComment)}>
                        <TextField id="outlined-basic" label="comentario" variant="outlined" className={classes.input}
                        {...register('content', { required: true })}
                        />
                        <IconButton type="submit">
                            <SendIcon/>
                        </IconButton>
                        {optionAdmin()}
                    </form>
                </Grid>
            </Grid>
        </div>

    );
}

export default ViewPublication;