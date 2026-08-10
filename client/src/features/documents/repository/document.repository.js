import documentProvider from "@/providers/documents.provider.js";
import { documentAdapter } from "../adapter/document.adapter.js";

export async function getAll() {
    const response = await documentProvider.getDocument();

    return response.data.data.map(documentAdapter);
}
export async function createDocument(data){
const response=await documentProvider.createDocument(data);
return response.data;
}