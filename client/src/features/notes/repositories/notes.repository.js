import notesProvider from "@/providers/notes.provider"
import {noteAdapter} from "../adapters/notes.adapter"
export async function getNotes(){
    const response=await notesProvider.getNotesApi();
    return response.data.data.map(noteAdapter)
}