import React from "react";
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
import Link from 'next/link'
import Router from 'next/router'

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
    const {deletePublication: doDelete} = publications();
    const [open, setOpen] = React.useState(false);

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
    //console.log('props view', props);
    return (
        <div className={classes.root} key={props.id}>
            <Grid container spacing={0} className={classes.container}>
                <Grid item xs={12} sm={6} className={classes.left}>
                    <Image
                        src="data:image/jpeg;base64,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"
                        alt="Imagen de publicacion"
                        width={500}
                        height={300}
                    />
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
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="Fundacion" secondary={props.props.props.title} />
                    </ListItem>
                    <div className={classes.message}>
                        <Comments/>
                    </div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Comentario" variant="outlined" className={classes.input}/>
                        <IconButton aria-label="comentar">
                            <SendIcon/>
                        </IconButton>
                        <Link href={`publications/foundations/update/${props.props.props.id}`}>
                            <IconButton aria-label="contactar con la fundacion">
                                <WhatsAppIcon/>
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
                    </form>

                </Grid>
            </Grid>
        </div>

    );
}


export default ViewPublication;