import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Note extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id) {
    const { removeNote } = this.props;
    removeNote(id);
  }

  render() {
    const {
      classes, category, text, id,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            { category }
          </Typography>
          <Typography variant="headline" component="h2">
            { text }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small" onClick={() => this.handleRemoveNote(id)}>Delete</Button>
        </CardActions>
      </Card>
    );
  }
}

Note.propTypes = {
  classes: PropTypes.object.isRequired,
  removeNote: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(Note);
