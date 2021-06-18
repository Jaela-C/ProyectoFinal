import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 400,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://www.yunbitsoftware.com/blog/wp-content/uploads/2021/01/24-scaled.jpg"
          title="Encabezado de la página"
        />
    </Card>
  );
}