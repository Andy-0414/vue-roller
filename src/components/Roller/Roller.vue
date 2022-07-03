<script lang="ts"></script>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import RollerItem from "./RollerItem.vue";
import { RollerItemMode } from "./";

interface Props {
    value?: string;
    charSet?: string[];
    mode?: RollerItemMode | string;
}

const props = withDefaults(defineProps<Props>(), {
    value: "123",
});

const charArray = computed(() => props.value.split(""));
</script>

<template>
    <div class="roller">
        <RollerItem :char="char" :mode="mode" v-for="char of charArray"></RollerItem>
    </div>
</template>

<style lang="scss" scoped>
.roller {
    display: flex;
}
</style>
