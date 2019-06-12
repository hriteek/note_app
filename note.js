const fs = require("fs");

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("note-data.json");
    return JSON.parse(notesString);
  } catch (err) {
    // console.log(err);
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync("note-data.json", JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };

  const duplicatesNotes = notes.filter(
    singleNote => singleNote.title === title
  );

  if (duplicatesNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};
const getAll = () => {
  // console.log("Getting all notes");
  return fetchNotes();
};

const getNote = title => {
  // console.log("Getting note", title);
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
};

const removeNote = title => {
  // console.log("Removing note", title);
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
