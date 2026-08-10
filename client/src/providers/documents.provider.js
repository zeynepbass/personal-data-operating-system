import  {documentApi} from "../features/documents/api/documents";

const documentProvider = {
    getDocument: documentApi.getDocument,
    createDocument: documentApi.createDocument,
};

export default documentProvider;