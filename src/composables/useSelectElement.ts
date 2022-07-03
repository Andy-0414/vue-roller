import { nextTick, onMounted, Ref, ref, watch } from "vue";

/**
 
 */
export default function useSelectElement(itemElements: Ref<HTMLDivElement[]>, targetIdx: Ref<number>) {
    const itemElement: Ref<HTMLDivElement | null> = ref(null);

    function updateItemElement() {
        itemElement.value = itemElements.value[targetIdx.value];
    }

    onMounted(updateItemElement);

    watch(targetIdx, () => {
        nextTick(updateItemElement);
    });

    return { itemElement };
}
