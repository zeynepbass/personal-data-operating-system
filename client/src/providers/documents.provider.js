import  {documentApi} from "../features/documents/api/documents";

const documentProvider = {
    getDocument: documentApi.getDocument,
    createDocument: documentApi.createDocument,
    deleteDocument:documentApi.deleteDocument
};

export default documentProvider;