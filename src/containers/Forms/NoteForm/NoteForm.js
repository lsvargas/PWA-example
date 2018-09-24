import React, { Component } from 'react';
import PropTypes from 'prop-types';
import askForPermissioToReceiveNotifications from '../../../config/firebase-config';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: '',
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value,
    });
  }

  writeNote() {
    const { newNoteContent } = this.state;
    const { addNote } = this.props;
    addNote(newNoteContent);

    this.setState({
      newNoteContent: '',
    });
  }

  render() {
    const { newNoteContent } = this.state;
    return (
      <div className="formWrapper">
        <input
          className="noteInput"
          placeholder="Write a new note..."
          value={newNoteContent}
          onChange={this.handleUserInput}
        />
        <button
          className="noteButton"
          onClick={this.writeNote}
          type="submit"
        >
          Add Note
        </button>
        <button type="button" onClick={askForPermissioToReceiveNotifications}>
          Push notification
        </button>
      </div>
    );
  }
}

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteForm;
