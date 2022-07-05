<script setup lang="ts">
import { computed } from "vue";
import { RollerItemCharSet, RollerItemMode } from "./";

export interface Props {
    value?: string;
    duration?: number;
    charSet?: string[] | RollerItemCharSet | string;
    mode?: RollerItemMode | string;
}

const props = withDefaults(defineProps<Props>(), {
    value: "123",
    charSet: "number",
});

const charArray = computed(() => [...props.value]);
</script>

<template>
    <div class="roller">
        <vue-roller-item :char="char" :duration="duration" :char-set="charSet" :mode="mode" v-for="char of charArray"></vue-roller-item>
    </div>
</template>

<style lang="scss">
.roller {
    display: flex;
}
</style>
