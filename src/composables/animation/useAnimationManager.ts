import { computed } from "vue";
import { Ref, ref, watch } from "vue";
import useReloadAnimation from "./useReloadAnimation";

/**
 * @description Manages the life cycle of animations that are executed according to changes in char values
 * @param char This is the target value, and the animation runs when the value changes.
 * @param charSet A set of target values, rolled according to the order of the list
 * @param duration animation duration
 */
export default function useAnimationManager(char: Ref<string>, defaultChar: Ref<string>, charSet: Ref<string[]>, duration: Ref<number>) {
    const targetIdx = computed(() => charSet.value.indexOf(char.value)); // Target index in charSet
    const prevTargetIdx = ref(charSet.value.indexOf(defaultChar.value)); // Target index in charSet just before

    const { reloadAnimation, isReady, isEnd } = useReloadAnimation(duration);

    // Check char value change
    const w = watch(char, (next, prev) => {
        prevTargetIdx.value = charSet.value.indexOf(prev);
        reloadAnimation();
    });

    reloadAnimation();

    return { isReady, isEnd, targetIdx, prevTargetIdx };
}
