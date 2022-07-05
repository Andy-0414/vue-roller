<script setup lang="ts">
import { toRefs, ref, Ref, computed } from "vue";
import useAnimationManager from "../../composables/useAnimationManager";
import useMeasureText from "../../composables/useMeasureText";
import useSelectElement from "../../composables/useSelectElement";
import { RollerCharSet, RollerItemCharSet, RollerItemMode } from "./";

export interface Props {
    char?: string;
    duration?: number;
    charSet?: string[] | RollerItemCharSet | string;
    mode?: RollerItemMode | string;
}
const props = withDefaults(defineProps<Props>(), {
    char: "",
    charSet: () => RollerCharSet[RollerItemCharSet.NUMBER],
    duration: 500,
    mode: RollerItemMode.SHORT,
});
const { char, charSet, duration } = toRefs(props);

const computedCharSet = computed(() => {
    if (RollerCharSet[props.charSet as RollerItemCharSet]) return RollerCharSet[props.charSet as RollerItemCharSet];
    if (Array.isArray(props.charSet)) return props.charSet as string[];
    if ((String(props.charSet as string)?.split(",").length || 0) >= 2)
        return String(props.charSet)
            ?.split(",")
            .map((i) => i.trim());
    return [];
});

const { isReady, isEnd, targetIdx, prevTargetIdx } = useAnimationManager(char, computedCharSet, duration);

const itemElements: Ref<HTMLDivElement[]> = ref([]);
const { itemElement } = useSelectElement(itemElements, targetIdx);
const { width } = useMeasureText(itemElement);

/**
 * @description Now the top value of the roller
 */
const top = computed(() => {
    // console.log(props.charSet, isReady.value, isEnd.value, targetIdx.value, prevTargetIdx.value);
    if (!isReady.value) {
        if (prevTargetIdx.value != -1) return `${25 - prevTargetIdx.value * 50}%`;
        return "100%";
    }
    if (targetIdx.value == -1) return "25%";
    return `${25 - targetIdx.value * 50}%`;
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
    if (targetIdx.value == 0) return ["", props.char, computedCharSet.value[targetIdx.value + 1]];

    // at the end of the array
    if (targetIdx.value == charSet.value.length - 1) return [computedCharSet.value[targetIdx.value - 1], props.char, ""];

    // in all other cases
    return computedCharSet.value.slice(targetIdx.value - 1, targetIdx.value + 2);
});
</script>

<template>
    <div class="roller-item" :style="{ width: `${width}px`, transition: `${duration}ms` }">
        <div class="roller-item__wrapper" :class="{ 'roller-item__wrapper--short': mode == RollerItemMode.SHORT }" v-if="isEnd">
            <div class="roller-item__wrapper__list">
                <div class="roller-item__wrapper__list__item" :class="{ 'roller-item__wrapper__list__item--target': item == char }" v-for="item of shortCharSet" ref="itemElements">{{ item }}</div>
            </div>
        </div>
        <div class="roller-item__wrapper" :class="{ 'roller-item__wrapper--short': mode == RollerItemMode.SHORT }" v-else>
            <div class="roller-item__wrapper__list" :style="{ top, transition: `${duration}ms` }">
                <div class="roller-item__wrapper__list__item" :class="{ 'roller-item__wrapper__list__item--target': item == char }" v-for="item of computedCharSet" ref="itemElements">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.roller-item {
    position: relative;

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
            mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(255, 255, 255, 0) 80%);
            -webkit-mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(255, 255, 255, 0) 80%);
        }
        .roller-item__wrapper__list {
            position: absolute;

            width: 100%;

            display: flex;
            align-items: center;
            flex-direction: column;

            box-sizing: border-box;

            transition: 0.25s;

            .roller-item__wrapper__list__item {
                display: flex;

                width: fit-content;
                height: 1em;

                box-sizing: border-box;

                user-select: none;
            }
            .roller-item__wrapper__list__item--target {
                user-select: text;
            }
        }
    }
}
</style>
