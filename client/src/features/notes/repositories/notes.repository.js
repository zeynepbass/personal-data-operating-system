import notesProvider from "@/providers/notes.provider"
import {noteAdapter} from "../adapters/notes.adapter"
export async function getNotes(){
    const response=await notesProvider.getNotesApi();
    return response.data.data.map(noteAdapter)
}
export async function deletedNotes(id){
    const response=await notesProvider.deleteNotesApi(id);
    return response.data;
}