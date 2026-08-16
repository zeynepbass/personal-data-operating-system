import {notesApi} from "../features/notes/api/notes.js"
const notesProvider = {
    getNotesApi: notesApi.getNotes,
    deleteNotesApi:notesApi.deleteNotes,
    createNotesApi:notesApi.createNotes
  };
  export default notesProvider