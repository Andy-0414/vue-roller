import { onMounted, Ref, ref, watch } from "vue";

/**
 
 */
export default function useMeasureText(itemElement: Ref<HTMLDivElement | null>) {
    const width = ref(0);

    function updateWidth() {
        width.value = itemElement.value?.clientWidth || 0;
    }

    onMounted(updateWidth);

    watch(itemElement, updateWidth);

    return { width };
}
