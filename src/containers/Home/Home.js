import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { notesDatabase } from '../../config/firebase-config';
import Note from '../../components/Note/Note';
import NoteForm from '../Forms/NoteForm/NoteForm';
import Axios from 'axios';


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
    this.notesDatabase = notesDatabase;
    this.state = {
      notes: [],
    };

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentWillMount() {
    const { notes } = this.state;
    const previousNotes = notes;

    this.notesDatabase.on('child_added', (snap) => {
      previousNotes.push({
        id: snap.key,
        description: snap.val().description,
        label: snap.val().label,
      });

      this.setState({
        notes: previousNotes,
      });
    });


    this.notesDatabase.on('child_removed', (snap) => {
      for (let i = 0; i < previousNotes.length; i += 1) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes,
      });
    });
  }

  addNote(note) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const data = {
      notification: {
        title: 'firebase',
        body: 'honj iseme231231213',
        click_action: 'http://localhost:3000/',
        icon: 'http://url-to-an-icon/icon.png',
      },
      to: 'ebVp3K-Oslg:APA91bF5_c_2gNkl7tYSFaSEjmziTO_9inkgpKCxE1s0ZBwQHdVJwBzkpLQ3OaWgld6nFC2FwFh7K-BM-u2U_mKuxISZkYtQ6pzGk5poU0K79smnRvWVRgklVOdNIkL2GJieQOip_Csj',
    };
    const httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Key=AAAAB4-c400:APA91bHQ8grtkLBhl46pUaGTf-EC2CX_m_9GLdsAD6TFF9Geb15PBQPFCK-FBL1AsjLd0FHPZ7zXPNfK8EE08CGOatdSWF5EXMH9xEjuicrnHukENrYW6j0jrgiHc7W4YKCecuGZOksF',
      },
    };
    Axios.post(url, data, httpHeaders)
      .then(response => console.log(response));

    this.notesDatabase.push().set({
      description: note,
      label: 'testing',
    });
  }

  removeNote(noteId) {
    this.notesDatabase.child(noteId).remove();
  }

  render() {
    const { classes } = this.props;
    const { notes } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {
          notes.map(x => (
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
