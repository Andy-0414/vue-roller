<script lang="ts"></script>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import RollerItem from "./RollerItem.vue";
import { RollerCharSet, RollerItemCharSet, RollerItemMode } from "./";

interface Props {
    value?: string;
    duration?: number;
    charSet?: string[] | RollerItemCharSet | string;
    mode?: RollerItemMode | string;
}

const props = withDefaults(defineProps<Props>(), {
    value: "123",
});

const charArray = computed(() => [...props.value]);
const computedCharSet = computed(() => {
    if (Array.isArray(props.charSet)) return props.charSet as string[];
    return RollerCharSet[props.charSet as RollerItemCharSet];
});
</script>

<template>
    <div class="roller">
        <RollerItem :char="char" :duration="duration" :charSet="computedCharSet" :mode="mode" v-for="char of charArray"></RollerItem>
    </div>
</template>

<style lang="scss" scoped>
.roller {
    display: flex;
}
</style>
