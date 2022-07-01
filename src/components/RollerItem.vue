<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref } from "vue";

interface Props {
    char?: string;
    charSet?: string[];
}
const props = withDefaults(defineProps<Props>(), {
    char: "",
    charSet: () => [...Array(10).keys()].map(String),
});
const isReady = ref(false);
setTimeout(() => {
    isReady.value = true;
}, 100);

const top = computed(() => {
    let idx = props.charSet.indexOf(props.char);
    if (!isReady.value) return "25%";
    if (idx == -1) return "25%";
    return `${25 - idx * 50}%`;
});
</script>

<template>
    <div class="roller-item">
        <div class="roller-item__wrapper">
            <div class="roller-item__wrapper__list" :style="{ top }">
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

        width: 100%;
        height: 200%;

        overflow: hidden;

        top: -50%;

        mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
        -webkit-mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);

        box-sizing: border-box;
        .roller-item__wrapper__list {
            position: absolute;

            top: 25%;

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
