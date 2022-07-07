<script setup lang="ts">
import { ref, watch } from "vue";
import Roller from "./components/Roller/Roller.vue";

const example1 = ref(2048);
const isFocusExample1 = ref(false);
watch(example1, () => {
    if (!example1.value) example1.value = 0;
    if (example1.value >= 999999999999) example1.value = 999999999999;
});

const example2 = ref("Hello");
const isFocusExample2 = ref(false);
watch(example2, () => {
    example2.value = example2.value.replace(/\s/gi, "-");
    example2.value = example2.value.replace(/[^a-z^A-Z|-]*$/, "");
    if (!example2.value) example2.value = "";
});

const example3 = ref("LONG");
const isFocusExample3 = ref(false);
watch(example3, () => {
    example3.value = example3.value.replace(/\s/gi, "-");
    example3.value = example3.value.replace(/[^a-z^A-Z|-]*$/, "").toUpperCase();
    if (!example3.value) example3.value = "";
});

const example4 = ref("🐭🐰🐻");
const charSetExample4 = ref(["🐶", "🐭", "🐹", "🐰", "🐻", "🐱", "🧸", "🐼"]);
function reloadValueExample4() {
    example4.value =
        charSetExample4.value[Math.floor(charSetExample4.value.length * Math.random())] +
        charSetExample4.value[Math.floor(charSetExample4.value.length * Math.random())] +
        charSetExample4.value[Math.floor(charSetExample4.value.length * Math.random())];
}
</script>

<template>
    <div id="app">
        <h1 class="app__onboarding">
            <Roller char-set="alphabet" value="VUE-ROLLER" mode="short" :duration="2000"></Roller>
        </h1>

        <section class="app__example">
            <h2 class="app__example__title">Number Example</h2>
            <div class="app__example__wrapper">
                <label class="app__example__wrapper__roller" :class="{ 'app__example__wrapper__roller--active': isFocusExample1 }">
                    <Roller :value="example1.toLocaleString('ko')" char-set="number" mode="short" :duration="1000"></Roller>
                    <input v-model="example1" placeholder="Number" type="number" @blur="isFocusExample1 = false" @focus="isFocusExample1 = true" />
                </label>
            </div>
        </section>
        <section class="app__example">
            <h2 class="app__example__title">Alphabet Example</h2>
            <div class="app__example__wrapper">
                <label class="app__example__wrapper__roller" :class="{ 'app__example__wrapper__roller--active': isFocusExample2 }">
                    <Roller :value="example2" char-set="alphabet" mode="short" :duration="1000"></Roller>
                    <input v-model="example2" placeholder="Alphabet" @blur="isFocusExample2 = false" @focus="isFocusExample2 = true" />
                </label>
            </div>
        </section>
        <section class="app__example">
            <h2 class="app__example__title">Long Mode Example</h2>
            <div class="app__example__wrapper">
                <label class="app__example__wrapper__roller" :class="{ 'app__example__wrapper__roller--active': isFocusExample3 }">
                    <Roller :value="example3" char-set="alphabet" mode="long" :duration="1000"></Roller>
                    <input v-model="example3" placeholder="Alphabet" @blur="isFocusExample3 = false" @focus="isFocusExample3 = true" />
                </label>
            </div>
        </section>

        <section class="app__example">
            <h2 class="app__example__title">Custom Char Set Example</h2>
            <div class="app__example__wrapper">
                <label class="app__example__wrapper__roller" @click="reloadValueExample4" style="cursor: pointer">
                    <Roller :value="example4" :char-set="charSetExample4" mode="long" :duration="1000" @animation-end="reloadValueExample4"></Roller>
                </label>
            </div>
        </section>

        <footer class="app__footer">MIT Licensed, Copyright © 2020 github.com/andy-0414</footer>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
}
#app {
    overflow-x: hidden;
    .app__onboarding {
        width: 100%;
        height: 100vh;

        margin: 0;
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #354952;
        color: white;

        font-size: 8em;
    }
    .app__example {
        width: 100%;
        max-width: 720px;

        padding: 40px;
        margin: 0 auto;

        .app__example__title {
            color: #42b883;
            font-size: 4em;
            text-align: center;
        }
        .app__example__wrapper {
            display: flex;

            width: 100%;

            .app__example__wrapper__roller {
                cursor: text;

                flex: 1;

                display: flex;
                justify-content: center;

                font-size: 3em;

                padding: 10px 0;
                border-bottom: 3px solid rgba(0, 0, 0, 0);

                input {
                    position: absolute;
                    width: 0;
                    height: 0;
                    opacity: 0;
                }
            }
            .app__example__wrapper__roller:hover {
                opacity: 0.8;
            }
            .app__example__wrapper__roller--active {
                border-bottom: 3px solid #42b883;
                padding: 10px 0;
            }
            .app__example__wrapper__try {
            }
        }
    }
    .app__footer {
        margin-top: 100px;

        padding: 20px;

        background-color: #354952;
        color: white;
    }
}
</style>
