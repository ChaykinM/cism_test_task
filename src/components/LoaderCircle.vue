<template>
    <div class="loader-container">
        <span class="loader"></span>
    </div>
</template>

<style scoped>

.loader-container {
    display: flex; 
    justify-content: center;
}
.loader {
    align-self: center;
    width: 48px;
    height: 48px;
    border: 5px solid #423e3e;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>