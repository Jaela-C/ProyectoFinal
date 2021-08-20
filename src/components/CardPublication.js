import React, { useEffect, useState } from 'react';
import CardContent from "@material-ui/core/CardContent";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { publications } from "../lib/publications";
import { useAuth } from '../hocs/useAuth';
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ViewPublication from "@/components/ViewPublication";


const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%',
        height: '400px',
    },
    media: {
        height: 140,
    },
    button:{
        alignItems: "end",
    },
    avatar:{
        padding:'0px'
    },
    paper: {
        textAlign:"right",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        height:"90%",
        width:"80%",
        display: "flex",
        flexDirection:"column",
    },
    exit:{
        height:'10px',
        width:'10px',
        float:"right",
        position:"relative",
    },
    close:{
        height:'22px',
        textAlign:"right",
        width:'100%',
        backgroundColor: '#5081E5',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    des:{
        overflow: 'hidden',
        height: '29%',
    },
}));

export default function CardPublication(props){
    const classes = useStyles();
    const { user } = useAuth();
    const {deletePublication: doDelete} = publications();
    const [open, setOpen] = useState(false);
    const handleDelete = async(id) => {
        try {
            await doDelete(id);
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
    console.log('props card', props);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <Card className={classes.root} key={props.props.id} >
            <CardContent>
                <ListItem className={classes.avatar}>
                    <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                        <ListItemText primary={props.props.name} secondary={props.props.phone} />
                </ListItem>
            </CardContent>
                        <CardActionArea onClick={handleOpen}>
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                        <CardContent className={classes.des}>
                            <CardActionArea onClick={handleOpen}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.props.title}
                                </Typography>
                            </CardActionArea>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.props.description}
                                </Typography>
                            </CardContent>
                        
                        <CardActions className={classes.button}>
                            <IconButton aria-label="add to favorites" onClick={handleOpen}>
                                <RemoveRedEyeIcon/>
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
                                    <div className={classes.paper}>
                                        <div className={classes.close}>
                                            <IconButton onClick={handleClose} className={classes.exit}>
                                                <CancelOutlinedIcon/>
                                            </IconButton>
                                        </div>
                                            <ViewPublication props = {props}/>
                                    </div>
                                </Fade>
                            </Modal>
                            <IconButton aria-label="add to favorites" onClick={() => {handleDelete(props.props.id)}}>
                                <WhatsAppIcon/>
                            </IconButton>
                        </CardActions>
        </Card>
    );
}