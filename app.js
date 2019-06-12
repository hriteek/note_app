const yargs = require("yargs");

const note = require("./note");

const titleOption = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};
const bodyOption = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};
const { argv } = yargs
  .command("add", "Add a new note", {
    title: titleOption,
    body: bodyOption
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title: titleOption
  })
  .command("remove", "Remove a note", {
    title: titleOption
  })
  .help();
const command = argv._[0];

console.log(`Command: ${command} 
************************`);

if (command === "add") {
  const ifNote = note.addNote(argv.title, argv.body);
  if (ifNote === undefined) {
    console.log("Note with the same title already exists");
  } else {
    console.log("Note successfully added");
    console.log(`title: ${ifNote.title}`);
    console.log(`body: ${ifNote.body}`);
  }
} else if (command === "list") {
  const listNote = note.getAll();
  console.log(`Printing ${listNote.length} notes:`);
  listNote.forEach(listSingleNote => {
    console.log(`title: ${listSingleNote.title}`);
    console.log(`body: ${listSingleNote.body}`);
    console.log("***********");
  });
} else if (command === "read") {
  const noteRead = note.getNote(argv.title);
  if (noteRead) {
    console.log(`title: ${noteRead.title}`);
    console.log(`body: ${noteRead.body}`);
  } else {
    console.log(`Note with title "${argv.title}" not found`);
  }
} else if (command === "remove") {
  const noteRemoved = note.removeNote(argv.title);
  const message = noteRemoved
    ? `Note with title "${argv.title}" was removed`
    : `Note with the title "${argv.title}" not found`;
  console.log(message);
} else {
  console.log("Command not recognized");
}
