<template>
	<div class="app">
		<header class="app__title">
			<h1>
				<Roller text="vue-roller" :charList="['v', 'u', 'e', 'o']" :transition="1"></Roller>
			</h1>
			<div class="app__title__action">
				<a href="https://github.com/Andy-0414/vue-roller">
					<img src="@/assets/GitHub-Mark-Light-120px-plus.png" />
				</a>
			</div>
		</header>
		<section class="app__content">
			<h2>Example</h2>
			<Roller :text="text" :isNumberFormat="isNumberFormat" :transition="transition"></Roller>
			<input type="text" v-model="text" />
			<label>
				isNumberFormat:
				<input type="checkbox" v-model="isNumberFormat" />
			</label>
			<label>
				Transition:
				<input type="range" v-model="transition" min="0.1" max="2" step="0.1" />
				({{transition}})
			</label>
		</section>
		<footer class="app__footer">MIT Licensed, Copyright © 2020 github.com/andy-0414</footer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Roller from "./components/Roller.vue";

@Component({
	components: { Roller: Roller }
})
export default class App extends Vue {
	text: string = "1234";
	isNumberFormat: boolean = false;
	transition: number = 0.5;
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;

	box-sizing: border-box;
	font-family: "Open Sans", sans-serif;
}
input[type="range"] {
	background-color: #354952;
	border-radius: 100px;
	outline: none;
	-webkit-appearance: none;
	font-size: 1em;
	overflow: hidden;
	&::-webkit-slider-thumb {
		width: 10px;
		height: 10px;
		-webkit-appearance: none;
		background: #42b883;
		box-shadow: -100vw 0 0 100vw #42b883;
		border: 0.1px solid #42b883;
	}
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
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	.app__title {
		position: relative;

		width: 100%;
		height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-size: 5em;

		background-color: #354952;
		color: white;

		.app__title__action {
			position: absolute;
			bottom: 2vh;
			left: 0;

			width: 100%;
			text-align: center;

			img {
				height: 6vh;
			}
		}
	}
	.app__content {
		margin-top: 100px;
		margin-bottom: 100px;
		width: 80%;
		height: 100vh;

		font-size: 2em;

		display: flex;
		flex-direction: column;
		align-items: center;

		h2 {
			font-size: 2em;
			color: #42b883;
			margin-bottom: 20px;
		}
		label {
			margin-top: 20px;
		}
	}
	.app__footer {
		background-color: #354952;
		color: white;
		width: 100%;
		padding: 20px;
	}
}
</style>
