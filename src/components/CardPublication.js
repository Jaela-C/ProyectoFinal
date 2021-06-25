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
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
    return(
        <Card className={classes.root}>
            <CardContent>
                <ListItem className={classes.avatar}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText primary="Jaela Falsa :p" secondary="July 20, 2014" />
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
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
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
        </Card>

    );

}