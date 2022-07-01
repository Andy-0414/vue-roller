import { computed } from "@vue/reactivity";
import { Ref, ref, watch, toRefs } from "vue";

export default function useAnimationManager(char: Ref<string>, charSet: Ref<string[]>, duration: Ref<number>) {
    const isReady = ref(false);
    const isEnd = ref(false);
    const prevTargetIdx = ref(0);

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

    const w = watch(
        () => char.value,
        (next, prev) => {
            prevTargetIdx.value = charSet.value.indexOf(prev);
            reloadAnimation();
        }
    );

    const targetIdx = computed(() => charSet.value.indexOf(char.value));

    reloadAnimation();
    return { isReady, isEnd, targetIdx, prevTargetIdx };
}
