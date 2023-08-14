<template>
    <DashboardHeader />
    <div class="content-container">
        <div class="dashboard-container">
            <div class="document-search">
                <h4>Поиск документа</h4>
                <form @submit.prevent="onSearchDocuments()">
                    <input v-model="searchInput" type="text" class="document-search-input"
                        placeholder="Введите ID документа">
                </form>

                <h4>Результаты</h4>
                <LoaderCircle v-if="documentsStore.loadingStatus.process" />
                <span v-if="documentsStore.loadingStatus.error != ''" class="important-text">
                    Ошибка запроса: {{ documentsStore.loadingStatus.error }}
                </span>
                <DocumentSearchResult v-if="documentsStore.documents.length != 0" />
                <p v-if="documentsStore.documents.length == 0 && !documentsStore.loadingStatus.process">
                    Ничего не найдено
                </p>
            </div>
            <div class="document-preview">
                <DocumentPreview v-if="documentsStore.selectedDocumentId != -1"
                    :document="documentsStore.getSelectedDocument()" />
                <p class="document-preview-notice" v-else>
                    Выберите документ, чтобы посмотреть его содержимое
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";

import { useDocumentsStore } from "@/store/DocumentsStore";
const documentsStore = useDocumentsStore();

import DashboardHeader from "@/components/Dashboard/DashboardHeader.vue";
import DocumentSearchResult from "@/components/Dashboard/DocumentSearchResult.vue";
import DocumentPreview from "@/components/Dashboard/DocumentPreview.vue";
import LoaderCircle from "@/components/LoaderCircle.vue";

export default defineComponent({
    name: "DashboardView",
    components: {
        DashboardHeader,
        DocumentSearchResult,
        DocumentPreview,
        LoaderCircle
    },
    setup() {
        const searchInput = ref('');

        const onSearchDocuments = () => {
            documentsStore.searchDocuments(searchInput.value);
        };

        return {
            documentsStore,
            searchInput,
            onSearchDocuments,
        }
    }
})

</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 75vh;
    background-color: rgba(253, 253, 253, 1);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
}

.document-search {
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.document-search-input {
    width: 192px;
    padding: 16px 24px;
    border-radius: 8px;
    border: 1.5px solid rgba(108, 117, 125, 1);
    background: rgba(255, 255, 255, 1);
    margin-bottom: 29px;
}

.document-preview {
    display: flex;
    justify-content: center;
    border-left: 1px solid rgba(224, 224, 224, 1);
    background: rgba(255, 255, 255, 1);
    padding: 30px;
    width: 100%;
}

.document-preview-notice {
    align-self: center;
}

@media (min-width: 961px) and (max-width: 1280px) {
    .document-preview {
        flex-direction: column;
        overflow-y: auto;
    }
}

@media (min-width: 300px) and (max-width: 960px) {
    .dashboard-container {
        flex-direction: column;
        height: auto;
        margin-bottom: 20px;
    }

    .document-search-input {
        width: calc(100% - 48px);
    }

    .document-preview {
        border: none !important;
        flex-direction: column;
        width: auto;
    }
}
</style>