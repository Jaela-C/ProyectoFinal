import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5',
    },
    colorLabel: {
        color: "#EC323D"
    },
    title: {
        color: "#FFFFFF",
        fontSize: 40
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(8),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        color: "#EC323D",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#FFFFFF",
        backgroundColor: "#3E54E7",
        marginLeft:"15px"
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
    butons:{
        textAlign:"right",
    },
}));

const ViewRequest = () => {

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Grid style={{paddingTop: "30px"}}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Datos de la solicitud
                    </Typography>
                </Grid>
                <form className={classes.form} noValidate style={{paddingBottom: "30px"}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled
                        defaultValue="Fundación prueba"
                        id="name"
                        label="Nombre de la fundacion"
                        name="name"
                        autoComplete="text"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        disabled
                        defaultValue="Usuario prueba"
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="text"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        disabled
                        defaultValue="Email Prueba"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="text"
                        autoFocus
                    />
                    <div className={classes.root1}>
                        <TextField
                            variant="outlined"
                            disabled
                            id="standard-disabled"
                            defaultValue="Comprobante"
                            fullWidth
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton color="default" aria-label="upload picture" component="span">
                                <GetAppIcon />
                            </IconButton>
                        </label>
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="state"
                        disabled
                        defaultValue="Estado prueba"
                        label="Estado"
                        name="state"
                        type="text"
                        autoFocus                        
                    />
                    <div className={classes.butons}>
                        <Button
                            className={classes.cancel}
                        >
                            Rechazar
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.submit}
                        >
                            Aprobar
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    )
};
export default ViewRequest;