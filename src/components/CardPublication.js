import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/initFirebase';
import Link from "@material-ui/core/Link";
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
import { useAuth } from '../hocs/useAuth'

const useStyles = makeStyles({
    root: {
        width: '100%',
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
});

export default function CardPublication(){
    const classes = useStyles();
    const { user, onAuth } = useAuth();
    const listPublications = [];
    const [dataPublications, setDataPublications] = useState([]);
    const {deletePublication: doDelete} = publications();
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

    const getPublications = async () => {
        await db.collection('foundations').doc(`${user.uid}`).collection('publications').onSnapshot(publication => {
            publication.forEach(doc => {
                const dataPublication = {
                    date_ex: doc.data().date_ex,
                    description: doc.data().description,
                    image: doc.data().image,
                    last_name: doc.data().last_name,
                    name: doc.data().name,
                    phone: doc.data().phone,
                    title: doc.data().title,
                };
                listPublications.push({ id: doc.id, ...dataPublication});
          });
          setDataPublications(listPublications);
        })
    };

    console.log('lista publicaciones', dataPublications)
    useEffect(()=>{
        onAuth()
        if(user){
            getPublications();
        }
    },[user]);

    return(
        <Card className={classes.root} >
            {
                dataPublications.map((data) => {
                    console.log('data', data)
                    return (
                        <>
                        <CardContent key={data.id}>
                        <ListItem className={classes.avatar}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary={data.name} secondary={data.phone} />
                        </ListItem>
                        </CardContent>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {data.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {data.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.button}>
                        <Link href={`publications/foundations/update/${data.id}`}>
                            <IconButton aria-label="add to favorites">
                                <RemoveRedEyeIcon/>
                            </IconButton>
                        </Link>
                            <IconButton aria-label="add to favorites" onClick={() => {handleDelete(data.id)}}>
                                <WhatsAppIcon/>
                            </IconButton>
                        </CardActions>
                        </>
                    );
                })
            }                    
        </Card>
    );
}