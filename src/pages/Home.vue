<script setup lang="ts">
import { ref } from "vue";
import Roller from "../components/Roller.vue";
const text = ref("");
</script>

<template>
    <div class="home" style="padding: 100px; font-size: 2em">
        <Roller :value="text"></Roller>
        <input v-model="text" type="text" style="margin-top: 20px" />
    </div>
</template>

<style lang="scss" scoped></style>
