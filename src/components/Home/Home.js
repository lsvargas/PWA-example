import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '../Card/Card';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const home = (props) => {
  const { classes } = props;
  const textFiller = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs>
          <Card
            category="#category"
            text={textFiller}
          />
        </Grid>
        <Grid item xs>
          <Card
            category="#category"
            text={textFiller}
          />
        </Grid>
        <Grid item xs>
          <Card
            category="#category"
            text={textFiller}
          />
        </Grid>
      </Grid>
    </div>
  );
};

home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(home);
