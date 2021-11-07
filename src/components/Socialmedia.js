import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 40,
    height: 40,
    color: "#FFFFFF",
  },
}));

export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        href="https://www.facebook.com/Quito-Acolita-111045008032503"
        target="_blank"
        className={classes.link}
      >
        <FacebookIcon className={classes.icon} />
      </Link>
      <Link
        href="http://www.instagram.com"
        target="_blank"
        className={classes.link}
      >
        <InstagramIcon className={classes.icon} />
      </Link>

      <Link
        href="http://www.instagram.com"
        target="_blank"
        className={classes.link}
      >
        <TwitterIcon className={classes.icon} />
      </Link>
    </Breadcrumbs>
  );
}