import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5'
    },
    colorLabel: {
        color: "#EC323D"
    },
    type: {
        color: "#FFFFFF",
        fontSize: 40
    },
    message: {
        color: "#FFFFFF",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(8),
    },
    avatar: {
        margin: theme.spacing(5, 0, 0),
        backgroundColor: "#FFFFFF",
        width: '150px',
        height: '150px',
        color: '#000000'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(5, 0, 2),
        color: "#FFFFFF",
        backgroundColor: "#F06177",
        width: "50%"
    },
    submit1: {
        margin: theme.spacing(5, 0, 15),
        color: "#FFFFFF",
        backgroundColor: "#F06177",
        width: "50%"
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
}));

const TypeUser = () => {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar} src="/logo.jpeg"></Avatar>
                <Grid container style={{paddingTop: "30px"}}>
                    <Grid item xs={9}>
                        <Typography className={classes.message}>¿Ya tienes cuenta?</Typography>
                    </Grid>
                    <Grid item xs={3} style={{textAlign: "end"}}>
                        <Link className={classes.colorLabel} href="/login" variant="body2"  value="Iniciar sesión">
                            {"Iniciar sesión"}
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider color="secondary"/>
                    </Grid>
                </Grid>
                <Grid style={{paddingTop: "30px"}}>
                    <Typography component="h1" variant="h5" className={classes.type}>
                        Perfil
                    </Typography>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    href="/registeradmin"
                >
                    Administrador
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit1}
                    href="/registeruser"
                >
                    Usuario
                </Button>
            </div>
    </Container>
    )
};
export default TypeUser;