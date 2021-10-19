import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useAuth } from '@/hocs/useAuth';


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

export default function BottomAppBar(props) {

    const dataComments = props.props.props.props.comments;
    const classes = useStyles();
    const { user } = useAuth();

    return (
        <>
        {dataComments.map((data, index) => (
            <ListItem key={index} className={classes.avatar}>
                <ListItemAvatar>
                    <Avatar alt="Usuario" src={user.image} />
                </ListItemAvatar>
                <ListItemText primary={data.name_user} secondary={data.content} />
            </ListItem>
        ))}
        </>
    );
}