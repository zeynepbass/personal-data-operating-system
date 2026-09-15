import {notesApi} from "../features/notes/api/notes.api"
const notesProvider = {
    getNotesApi: notesApi.getNotes,
    deleteNotesApi:notesApi.deleteNotes,
    createNotesApi:notesApi.createNotes
  };
  export default notesProvider