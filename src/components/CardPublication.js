import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/initFirebase'
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { date } from 'yup/lib/locale';

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

    const listPublications = [];
    const [dataPublications, setDataPublications] = useState([]);

    useEffect(()=>{
        const getPublications = async () => {
            const user = await auth.currentUser;
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
        getPublications();
    },[]);

    return(
        <Card className={classes.root} >
            {
                dataPublications.map((data) => {
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
                            <IconButton aria-label="add to favorites">
                                <RemoveRedEyeIcon/>
                            </IconButton>
                            <IconButton aria-label="add to favorites">
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