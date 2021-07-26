import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    avatar:{
        padding:'0px',
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();

    return (
        <>
            <ListItem className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Usuario" secondary="Comentario de usuario" />
            </ListItem>
            <ListItem className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Usuario" secondary="Comentario de usuario" />
            </ListItem>
            <ListItem className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Usuario" secondary="Comentario de usuario" />
            </ListItem>
            <ListItem className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Usuario" secondary="Este es un comentario largo de usuario donde expresa muchas de sus ideas" />
            </ListItem>
            <ListItem className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Usuario" secondary="Comentario de usuario" />
            </ListItem>
            <ListItem className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Usuario" secondary="Comentario de usuario" />
            </ListItem><ListItem className={classes.avatar}>
            <ListItemAvatar>
                <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Usuario" secondary="Comentario de usuario" />
        </ListItem><ListItem className={classes.avatar}>
            <ListItemAvatar>
                <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Usuario" secondary="Comentario de usuario" />
        </ListItem><ListItem className={classes.avatar}>
            <ListItemAvatar>
                <Avatar alt="Usuario" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Usuario" secondary="Comentario de usuario" />
        </ListItem>
        </>
    );
}