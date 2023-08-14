import { defineStore } from "pinia";
import { ref } from "vue";

import { DocumentsAPI } from "@/api/DocumentsAPI";

export const useDocumentsStore = defineStore('documentsStore', () => {
    const loadingStatus = ref({
        process: false,
        error: '',
    });
    //  показывать ошибку !!!
    const documents = ref([]);
    const selectedDocumentId = ref(-1);

    interface Document {
        id: number;
        name: string;
        description: string;
        image: string;
    }

    const getDocuments = async () => {
        loadingStatus.value.process = true;
        loadingStatus.value.error = '';
        try {
            const res = await DocumentsAPI.getDocuments();
            const data = await res.data;
            documents.value = data;
        } catch (error) {
            loadingStatus.value.process = true;
            loadingStatus.value.error = `${error}`;
        }

        loadingStatus.value.process = false;
    }

    const searchDocuments = async (searchQuery: string) => {
        loadingStatus.value.process = true;
        loadingStatus.value.error = '';
        try {
            const res = await DocumentsAPI.searchQuery(searchQuery);
            const data = await res.data;
            documents.value = data;
        } catch (error) {
            loadingStatus.value.process = true;
            loadingStatus.value.error = `${error}`;
        }

        loadingStatus.value.process = false;
    }

    const getSelectedDocument = () => {
        return documents.value.find((d: Document) => d.id === selectedDocumentId.value);
    }

    return {
        loadingStatus,
        documents,
        selectedDocumentId,
        getDocuments,
        searchDocuments,
        getSelectedDocument,
    }

})