<template>
	<div id="app">
		<Roller :number="number"></Roller>
		<input type="text" min="0" max="20000" v-model="number" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Roller from "./components/Roller.vue";

@Component({
	components: { Roller: Roller }
})
export default class App extends Vue {
	number: number = 1234;
}
</script>

<style lang="scss">
</style>
