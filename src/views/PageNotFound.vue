<template>
    <div class="content-container">
        <div class="card">
            <span class="sad-text">
                ;(
            </span>
            <span class="important-text">
                Ошибка 404: Страница не найдена
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "PageNotFound",
})
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 75vh;
    background-color: rgba(253, 253, 253, 1);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
    margin-top: 50px;
}

.sad-text {
    font-size: 120px;
    color: rgba(108, 117, 125, 1);
    font-weight: 400;
}
</style>