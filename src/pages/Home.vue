<script setup lang="ts">
import { ref, watch } from "vue";
import Roller from "../components/Roller/Roller.vue";

const example1 = ref(2048);
watch(example1, () => {
    if (example1.value >= 999999999) example1.value = 999999999;
});

const example2 = ref("Hello");
watch(example2, () => {
    example2.value = example2.value.replace(/[^a-z^A-Z]*$/, "");
});
</script>

<template>
    <div id="app">
        <section class="app__onboarding">
            <Roller char-set="alphabet" value="VUE-ROLLER" mode="short" :duration="2000"></Roller>
        </section>
        <section class="app__example">
            <div class="app__example__roller">
                <Roller :value="example1.toLocaleString('ko')" char-set="number" value="1234" mode="short" :duration="1000"></Roller>
            </div>
            <div class="app__example__try">
                <input v-model="example1" placeholder="Number" type="number" />
            </div>
        </section>
        <section class="app__example">
            <div class="app__example__roller">
                <Roller :value="example2" char-set="alphabet" value="1234" mode="short" :duration="1000"></Roller>
            </div>
            <div class="app__example__try">
                <input v-model="example2" placeholder="Alphabet" />
            </div>
        </section>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
}
#app {
    .app__onboarding {
        width: 100%;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #354952;
        color: white;

        font-size: 8em;
    }
    .app__example {
        display: flex;

        padding: 40px;
        .app__example__roller {
            flex: 1;

            font-size: 4em;
        }
        .app__example__try {
            flex: 1;

            input {
                font-size: 4em;
            }
        }
    }
}
</style>
