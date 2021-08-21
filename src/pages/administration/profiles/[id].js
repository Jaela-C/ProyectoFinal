import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#5081E5',
    },
    colorLabel: {
        color: "#EC323D"
    },
    title: {
        color: "#FFFFFF",
        fontSize: 30
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
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#FFFFFF",
        backgroundColor: "#EC323D",
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
    input: {
        display: 'none',
    },
    butons:{
        textAlign:"center",
    },
    containertavatar: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
        textAlign:"center",
        margin:"15px",
      },
    avatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
}));

const ViewRequest = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <div className={classes.containertavatar}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                </div>
                    <Typography component="h3" variant="h3" className={classes.title}>
                        Nombre del usuario
                    </Typography>
                <form className={classes.form} noValidate style={{paddingBottom: "30px"}}>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled
                        defaultValue="Tipo de usuario prueba"
                        id="type"
                        label="Tipo de usuario"
                        name="type"
                        autoComplete="text"
                        autoFocus
                    />
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
                            onClick={handleOpen}
                            variant="contained"
                            className={classes.submit}
                        >
                            Eliminar
                        </Button>
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
                                <p id="transition-modal-description">¿Esta seguro de borrar este usuario?</p>
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
                    </div>
                </form>
            </div>
        </Container>
    )
};
export default ViewRequest;