<template>
	<div class="app">
		<header class="app__title">
			<h1>
				<Roller text="vue-roller" :charList="['v', 'u', 'e', 'o']" transition="1"></Roller>
			</h1>
		</header>
		<section class="app__content">
			<h2>Example</h2>
			<Roller :text="number" :isDecimalSeparator="isDecimalSeparator"></Roller>
			<input type="text" v-model="number" />
			<label>
				isDecimalSeparator:
				<input type="checkbox" v-model="isDecimalSeparator" />
			</label>
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Roller from "./components/Roller.vue";

@Component({
	components: { Roller: Roller },
})
export default class App extends Vue {
	number: number = 1234;
	randomNumber: number = 1000;
	isDecimalSeparator: boolean = false;

	created() {
		setInterval(() => {
			this.randomNumber = Math.floor(Math.random() * 8999 + 1000);
		}, 1000);
	}
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;

	box-sizing: border-box;
	font-family: "Open Sans", sans-serif;
}
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	.app__title {
		width: 100%;
		height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-size: 5em;

		background-color: #354952;
		color: white;
	}
	.app__content {
		margin-top: 100px;
		margin-bottom: 100px;
		width: 80%;

		font-size: 2em;

		display: flex;
		flex-direction: column;
		align-items: center;

		h2 {
			color: #42b883;
		}
		input[type="text"] {
			border: none;
			outline: none;

			border-bottom: 1px solid #354952;
			font-size: 1em;

			margin: 30px 0;

			&:hover,
			&:focus {
				border-bottom: 1px solid #42b883;
			}
		}
	}
}
</style>
