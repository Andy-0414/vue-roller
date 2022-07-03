<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { toRefs } from "vue";
import useAnimationManager from "../../composables/useAnimationManager";
import { RollerItemMode } from "./";

interface Props {
    char?: string;
    duration?: number;
    charSet?: string[];
    mode?: RollerItemMode | string;
}
const props = withDefaults(defineProps<Props>(), {
    char: "",
    charSet: () => [...Array(10).keys()].map(String),
    duration: 500,
    mode: RollerItemMode.SHORT,
});
const { char, charSet, duration } = toRefs(props);

const { isReady, isEnd, targetIdx, prevTargetIdx } = useAnimationManager(char, charSet, duration);

/**
 * @description Now the top value of the roller
 */
const top = computed(() => {
    let idx = targetIdx.value;
    if (!isReady.value) {
        if (prevTargetIdx.value != -1) return `${25 - prevTargetIdx.value * 50}%`;
        return "100%";
    }
    if (idx == -1) return "25%";
    return `${25 - idx * 50}%`;
});

/**
 * @description Array of characters to be displayed after animation ends
 */
const shortCharSet = computed(() => {
    // In case of short mode, it is sufficient to show only one char
    if (props.mode == RollerItemMode.SHORT) return [props.char];

    // For values not in charSet, an empty string is inserted before and after.
    if (targetIdx.value == -1) return ["", props.char, ""];

    // at the beginning of the array
    if (targetIdx.value == 0) return ["", props.char, props.charSet[targetIdx.value + 1]];

    // at the end of the array
    if (targetIdx.value == charSet.value.length - 1) return [props.charSet[targetIdx.value - 1], props.char, ""];

    // in all other cases
    return props.charSet.slice(targetIdx.value - 1, targetIdx.value + 2);
});
</script>

<template>
    <div class="roller-item">
        <div class="roller-item__wrapper" :class="{ 'roller-item__wrapper--short': mode == RollerItemMode.SHORT }" v-if="isEnd">
            <div class="roller-item__wrapper__list">
                <div class="roller-item__wrapper__list__item" v-for="item of shortCharSet">{{ item }}</div>
            </div>
        </div>
        <div class="roller-item__wrapper" :class="{ 'roller-item__wrapper--short': mode == RollerItemMode.SHORT }" v-else>
            <div class="roller-item__wrapper__list" :style="{ top, transition: `${duration}ms` }">
                <div class="roller-item__wrapper__list__item" v-for="item of charSet">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.roller-item {
    position: relative;

    width: 1em;
    height: 1em;

    .roller-item__wrapper {
        position: relative;

        display: flex;
        align-items: center;

        width: 100%;
        height: 200%;

        overflow: hidden;

        top: -50%;

        mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
        -webkit-mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);

        box-sizing: border-box;

        &.roller-item__wrapper--short {
            mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 55%, rgba(255, 255, 255, 0) 80%);
            -webkit-mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 55%, rgba(255, 255, 255, 0) 80%);
        }
        .roller-item__wrapper__list {
            position: absolute;

            display: flex;
            flex-direction: column;

            box-sizing: border-box;

            transition: 0.25s;

            .roller-item__wrapper__list__item {
                display: flex;

                width: 1em;
                height: 1em;

                box-sizing: border-box;
            }
        }
    }
}
</style>
