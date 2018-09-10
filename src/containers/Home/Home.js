import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import 'firebase/database';
import firebase from 'firebase/app';
import { DB_CONFIG } from '../../config/config';
import Note from '../../components/Note/Note';
import NoteForm from '../Forms/NoteForm/NoteForm';

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

class home extends Component {
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');
    this.state = {
      notes: [],
    };

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentWillMount() {
    const previousNotes = this.state.notes;

    this.database.on('child_added', (snap) => {
      previousNotes.push({
        id: snap.key,
        description: snap.val().description,
        label: snap.val().label,
      });

      this.setState({
        notes: previousNotes,
      });
    });


    this.database.on('child_removed', (snap) => {
      for (let i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes,
      });
    });
    console.log(this.state);
  }

  addNote(note) {
    this.database.push().set({
      description: note,
      label: 'testing',
    });
  }

  removeNote(noteId) {
    console.log(`from the parent: ${noteId}`);
    this.database.child(noteId).remove();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {
          this.state.notes.map(x => (
            <Grid key={x.id} item xs>
              <Note
                category={x.label}
                text={x.description}
                key={x.id}
                id={x.id}
                removeNote={this.removeNote}
              />
            </Grid>
          ))
        }
        </Grid>
        <NoteForm addNote={this.addNote} />
      </div>
    );
  }
}

home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(home);
