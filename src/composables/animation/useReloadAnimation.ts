import { Ref, ref, watch } from "vue";

export default function useReloadAnimation(duration: Ref<number>) {
    const isReady = ref(false); // Ready to run animation (default 100ms)
    const isEnd = ref(false); // End all animations

    let outerTimer: ReturnType<typeof setTimeout>;
    let innerTimer: ReturnType<typeof setTimeout>;

    let animationEnd: Function = function () {};

    return {
        reloadAnimation: () => {
            isReady.value = false;
            isEnd.value = false;
            clearTimeout(outerTimer);
            clearTimeout(innerTimer);

            outerTimer = setTimeout(() => {
                isReady.value = true;
                innerTimer = setTimeout(() => {
                    isEnd.value = true;
                    animationEnd();
                }, duration.value);
            }, 100);
        },
        isReady,
        isEnd,
        onAnimationEnd: (fn: Function) => {
            animationEnd = fn;
        },
    };
}
