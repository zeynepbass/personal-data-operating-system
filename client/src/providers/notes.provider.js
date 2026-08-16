import {notesApi} from "../features/notes/api/notes.js"
const notesProvider = {
    getNotesApi: notesApi.getNotes,
    deleteNotesApi:notesApi.deleteNotes
  };
  export default notesProvider