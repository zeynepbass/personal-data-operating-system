import documentProvider from "@/providers/documents.provider.js";
import { documentAdapter } from "../adapter/document.adapter.js";

export async function getAll() {
    const response = await documentProvider.getDocument();

    return response.map(documentAdapter);
}