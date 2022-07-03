import { computed } from "@vue/reactivity";
import { Ref, ref, watch } from "vue";

/**
 * @description Manages the life cycle of animations that are executed according to changes in char values
 * @param char This is the target value, and the animation runs when the value changes.
 * @param charSet A set of target values, rolled according to the order of the list
 * @param duration animation duration
 */
export default function useAnimationManager(char: Ref<string>, charSet: Ref<string[]>, duration: Ref<number>) {
    const isReady = ref(false); // Ready to run animation (default 100ms)
    const isEnd = ref(false); // End all animations

    const targetIdx = computed(() => charSet.value.indexOf(char.value)); // Target index in charSet
    const prevTargetIdx = ref(0); // Target index in charSet just before

    // An animation start function that runs when a value changes
    function reloadAnimation() {
        isReady.value = false;
        isEnd.value = false;
        setTimeout(() => {
            isReady.value = true;
            setTimeout(() => {
                isEnd.value = true;
            }, duration.value);
        }, 100);
    }

    // Check char value change
    const w = watch(
        () => char.value,
        (next, prev) => {
            prevTargetIdx.value = charSet.value.indexOf(prev);
            reloadAnimation();
        }
    );

    reloadAnimation();

    return { isReady, isEnd, targetIdx, prevTargetIdx };
}
