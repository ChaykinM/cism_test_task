<template>
    <div class="document-search-result-block" v-if="getDocuments.length != 0">
        <div class="document-search-result">
            <div v-for="doc in getDocuments" :key="doc.id" @click="onSelectDocument(doc.id)" class="search-result-item">
                <div class="search-result-item-image">
                    <img :src="doc.image !== null ? `${doc.image}` : `./default_image.png`" :alt="doc.name"
                        onerror="this.src='./default_image.png'" loading="eager">
                </div>
                <div class="search-result-item-description"
                    :class="documentsStore.selectedDocumentId === doc.id ? 'search-result-item-selected' : ''">
                    <span class="important-text">{{ doc.name }}</span>
                    <p>12 MB</p>
                </div>
            </div>
        </div>

        <div class="pagination-container">
            <button class="btn-pagination" @click="prevPage()" :disabled="currentPage == 1 ? true : false"><i
                    class="fa fa-angle-left"></i></button>
            <button class="btn-pagination" @click="nextPage()" :disabled="currentPage == pageLength ? true : false"><i
                    class="fa fa-angle-right"></i></button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { defineComponent } from "vue";
import { useDocumentsStore } from "@/store/DocumentsStore";
const documentsStore = useDocumentsStore();

export default defineComponent({
    name: "DocumentSearchResult",
    setup() {
        const currentPage = ref(1);
        const pageLength = ref(0);
        const docsToPageSize = ref(4);

        const onSelectDocument = (documentId: number) => {
            documentsStore.selectedDocumentId === documentId ? documentsStore.selectedDocumentId = -1 : documentsStore.selectedDocumentId = documentId;
        }

        const getDocuments = computed(() => {
            return documentsStore.documents.filter((row: number, index: number) => {
                pageLength.value = Math.ceil(documentsStore.documents.length / docsToPageSize.value);

                let start = (currentPage.value - 1) * docsToPageSize.value;
                let end = currentPage.value * docsToPageSize.value;
                if (index >= start && index < end) return true;
            })
        });

        const nextPage = () => {
            currentPage.value++;
        }

        const prevPage = () => {
            currentPage.value--;
        }

        return {
            documentsStore,
            onSelectDocument,
            currentPage,
            pageLength,
            getDocuments,
            nextPage,
            prevPage
        }
    }
})
</script>

<style scoped> .document-search-result-block {
     display: flex;
     flex-direction: column;
     justify-content: center;
     gap: 18px;
 }

 .document-search-result {
     display: flex;
     flex-direction: column;
     justify-content: center;
     gap: 18px;
 }

 .search-result-item {
     display: flex;
     cursor: pointer;
     width: 240px;
     height: 70px;
     box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
     border-radius: 10px;
 }

 .search-result-item-selected {
     background-color: rgba(13, 110, 253, 1);
 }

 .search-result-item-selected span {
     color: rgb(248, 249, 250);
 }

 .search-result-item-selected p {
     color: rgb(248, 249, 250);
 }

 .search-result-item-image img {
     border-right: 1px solid rgba(224, 224, 224, 1);
     width: 70px;
     height: 70px;
     border-radius: 10px 0 0 10px;
     z-index: 10;
 }

 .search-result-item-description {
     width: 100%;
     padding: 15px;
     border-radius: 0 10px 10px 0;
 }

 .pagination-container {
     align-self: flex-end;
 }

 @media (max-width: 960px) {
     .document-search-result {
         display: flex;
         flex-direction: row;
         flex-wrap: wrap;
     }

     .pagination-container {
         align-self: center;
     }
 }
</style>