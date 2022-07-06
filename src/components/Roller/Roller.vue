<script setup lang="ts">
import { computed, watch, defineEmits, toRefs } from "vue";
import RollerItem from "./RollerItem.vue";
import { RollerCharSet, RollerItemCharSet, RollerItemMode } from "./";
import useReloadAnimation from "../../composables/animation/useReloadAnimation";

export interface Props {
    value?: string;
    defaultValue?: string;
    duration?: number;
    charSet?: string[] | RollerItemCharSet | string;
    mode?: RollerItemMode | string;
}

const props = withDefaults(defineProps<Props>(), {
    value: "123",
    defaultValue: "",
    duration: 500,
});
const { duration, value } = toRefs(props);

// animation
const { reloadAnimation, onAnimationEnd } = useReloadAnimation(duration);
const emit = defineEmits(["animation-end"]);

watch([value], () => {
    reloadAnimation();
});
onAnimationEnd(() => emit("animation-end"));

reloadAnimation();

// char & char-set
const charArray = computed(() => [...props.value]);
const defaultCharArray = computed(() => [...props.defaultValue]);
const computedCharSet = computed(() => {
    if (Array.isArray(props.charSet)) return props.charSet as string[];
    return RollerCharSet[props.charSet as RollerItemCharSet];
});
</script>

<template>
    <TransitionGroup tag="div" name="roller-list" class="roller">
        <RollerItem :char="char" :duration="duration" :charSet="computedCharSet" :defaultChar="defaultCharArray[idx]" :mode="mode" v-for="(char, idx) of charArray" :key="idx"></RollerItem>
    </TransitionGroup>
</template>

<style lang="scss" scoped>
.roller {
    display: flex;
}
.roller-list-enter-active,
.roller-list-leave-active {
    transition: 0.5s;
}
.roller-list-enter-from {
    opacity: 0;
}
.roller-list-enter-to {
    opacity: 1;
}
.roller-list-leave-from {
    opacity: 1;
}
.roller-list-leave-to {
    opacity: 0;
    width: 0px !important;
}
</style>
