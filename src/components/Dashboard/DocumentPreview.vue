<template>
    <div class="document-preview-img">
        <img :src="document.image !== null ? `${document.image}` : `./default_image.png`" alt="document.name"
            onerror="this.src='./default_image.png'">
    </div>
    <div class="document-preview-info">
        <h4>{{ document.name }}</h4>
        <div class="document-preview-actions">
            <button @click="downloadDocumentInfo()" class="btn btn-blue-outline" download> Скачать </button>
            <button @click="deleteImage()" class="btn btn-red-outline" :disabled='document.image === null ? true : false'> Удалить </button>
        </div>
        <h4>Описание</h4>
        <p>
            {{ document.description }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "DocumentPreview",
    props: {
        document: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const downloadDocumentInfo = () => {
            const blob = new Blob([props.document.description], { type: 'text/plain' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = props.document.name
            link.click()
            URL.revokeObjectURL(link.href)
        }; 

        const deleteImage = () => {
            console.log("Delete action");
        }; 
        
        return {
            downloadDocumentInfo,
            deleteImage, 
        }
    }
})
</script>

<style scoped>
.document-preview-img {
    display: flex;
    justify-content: center;
    margin-right: 61px;
}

.document-preview-img img {
    border: 1px solid #E0E0E0;
    width: 424px;
    height: 286px;
}

.document-preview-actions {
    display: flex;
    gap: 17px;
    margin-bottom: 47px;
}

.document-preview-info {
    display: flex;
    flex-direction: column;
}

@media (min-width: 961px) and (max-width: 1280px) {
    .document-preview-img {
        margin: 17px 0px 17px 0px;
    }

    .document-preview-img img {
        width: 100%;
        height: auto;

    }
}

@media (min-width: 600px) and (max-width: 960px) {
    .document-preview-img {
        margin: 17px 0px 17px 0px;
    }

    .document-preview-img img {
        width: 100%;
        height: auto;
    }
}

@media (max-width: 599px) {
    .document-preview-img {
        margin: 17px 0px 17px 0px ;
    }

    .document-preview-img img {
        width: 100%;
        height: auto;
    }

    .document-preview-actions {
        flex-direction: column;
    }
}

</style>