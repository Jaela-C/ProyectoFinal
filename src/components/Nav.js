import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import { useAuth } from '../hocs/useAuth';
import Image from 'next/image';
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#3E54E7",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    marginRight: 20,
  },
  icons: {
    color: '#FFFFFFF',
  },
  usernav: {
    marginLeft: "8%"
  },
  iconuser:{
    textAlign: "end",
    position: 'relative',
  },
  right:{
    height:40,
    width:'100%',
    position: 'absolute',
    top: '46%',
    marginTop: -10,
    textAlign: 'right',
  },
}));

export default function MainMenu() {
  const classes = useStyles();
  const { user, logout } = useAuth();
  console.log('nav ', user);

  const handleLogout = async () => {
    logout();
  };

  const nav = () => {
    if(user){
      return (
        <div >
        <AppBar position="static">
          <Toolbar>
        {
          user.role === "USER" ?
          <>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Image
                src="/logonav.png"
                alt="Imagen de publicación"
                width={100}
                height={50}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href="/users" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <PersonIcon />
              </IconButton>{"MI PERFIL"}</Link>
              <Link href="/publications" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <ListAltIcon />
              </IconButton>{"PUBLICACIONES"}</Link>
            </Grid>
            <Grid item xs={3} className={classes.iconuser}>
            <Link href="/users" color="inherit" >
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <PersonPinIcon />
              </IconButton>{user.name}
            </Link>
            <Link onClick={() => {
              handleLogout();
            }} color="inherit">
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <ExitToAppIcon />
              </IconButton>
            </Link>
            </Grid>
          </Grid>
          </>
          : user.role ==="ADMIN" ?
          <>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Image
                src="/logonav.png"
                alt="Imagen de publicación"
                width={100}
                height={50}
              />
            </Grid>
            <Grid item xs={7}>
              <Link href="/foundations" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <PersonIcon />
              </IconButton>{"MI PERFIL"}</Link>
              <Link href="/publications" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <ListAltIcon />
              </IconButton>{"PUBLICACIONES"}</Link>
              <Link href="/publications/new" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <EditIcon />
              </IconButton>{"REGISTRAR PUBLICACIÓN"}</Link>
            </Grid>
            <Grid item xs={3} className={classes.iconuser}>
            <Link href="/foundations" color="inherit" >
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <PersonPinIcon />
              </IconButton>{user.name}</Link>
            <Link onClick={() => {
              handleLogout();
            }} color="inherit">
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <ExitToAppIcon />
              </IconButton>
            </Link>
            </Grid>
          </Grid>
          </>
          : user.role ==="SUPERADMIN" ?
          <>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Image
                src="/logonav.png"
                alt="Imagen de publicación"
                width={100}
                height={50}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href="/administration" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <NotificationsActiveIcon />
              </IconButton>{"NOTIFICACIONES"}</Link>
              <Link href="/administration/profiles" color="inherit" className={classes.usernav}>
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <ListAltIcon />
              </IconButton>{"PERFILES"}</Link>
            </Grid>
            <Grid item xs={3} className={classes.iconuser}>
            <Link href="/administration" color="inherit" >
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <PersonPinIcon />
              </IconButton>{user.name}</Link>
            <Link onClick={() => {
              handleLogout();
            }} color="inherit">
              <IconButton color="inherit" aria-label="upload picture" component="span">
                <ExitToAppIcon />
              </IconButton>
            </Link>
            </Grid>
          </Grid>
          </>
          : <>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Image
                src="/logonav.png"
                alt="Imagen de publicación"
                width={100}
                height={50}
              />
            </Grid>
            <Grid item xs={9} className={classes.iconuser}>
              <Link href="/login" color="inherit" className={classes.nav}>{"Iniciar Sesión"}</Link>
              <Link href="/type" color="inherit" className={classes.nav}>{"Registrarse"}</Link>
            </Grid>
          </Grid>
          </>
        }
          </Toolbar>
        </AppBar>
        </div>
    );
    }
    else{
      return (
        <div >
        <AppBar position="static">
          <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Image
                src="/logonav.png"
                alt="Imagen de publicación"
                width={100}
                height={50}
              />
            </Grid>
            <Grid item xs={9} className={classes.iconuser}>
            <div className={classes.right}>
              <Link href="/login" color="inherit" className={classes.nav}>{"Iniciar Sesión"}</Link>
              <Link href="/type" color="inherit" className={classes.nav}>{"Registrarse"}</Link>
            </div>
            </Grid>
          </Grid>
          </Toolbar>
        </AppBar>
        </div>
    );}
  }
  return (
      <div className={classes.root}>
        {nav()}
      </div>
  );
}