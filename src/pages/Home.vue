<script setup lang="ts">
import { ref } from "vue";
import { RollerItemCharSet } from "../components/Roller";
import Roller from "../components/Roller/Roller.vue";

const text = ref("");
</script>

<template>
    <div id="app">
        <div class="app__onboarding">
            <Roller char-set="alphabet" value="VUE-ROLLER" mode="short" :duration="2000"></Roller>
        </div>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
}
#app {
    .app__onboarding {
        width: 100%;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #354952;
        color: white;

        font-size: 8em;
    }
}
</style>
