<template>
	<div class="app">
		<header class="app__title">
			<h1>
				<Roller text="vue-roller" :charList="stringCharList" :transition="2" :isStatic="true" class="roller"></Roller>
			</h1>
			<div class="app__title__action">
				<a href="https://github.com/Andy-0414/vue-roller">
					<img src="@/assets/GitHub-Mark-Light-120px-plus.png" />
				</a>
			</div>
		</header>
		<section class="app__content">
			<h2>Example</h2>
			<Roller :text="text" :isNumberFormat="isNumberFormat" :transition="transition" :charList="getCharList" :wordWrap="Number(wordWrap)" defaultChar="0" class="roller"></Roller>
			<input type="text" v-model="text" />
			<label>
				isNumberFormat:
				<input type="checkbox" v-model="isNumberFormat" />
			</label>
			<label>
				transition:
				<input type="range" v-model="transition" min="0.1" max="2" step="0.1" />
				({{ transition }})
			</label>
			<label>
				wordWrap:
				<input type="range" v-model="wordWrap" min="0" max="20" step="1" />
				({{ wordWrap }})
			</label>
			<label>
				charList:
				<span class="charlist">{{ getCharList }}</span>
				<button @click="changeCharListMode">Toggle CharList</button>
			</label>
		</section>
		<footer class="app__footer">MIT Licensed, Copyright © 2020 github.com/andy-0414</footer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Roller from "./components/Roller.vue";

@Component({
	components: { Roller },
})
export default class App extends Vue {
	text: string = "1234";
	isNumberFormat: boolean = false;
	transition: number = 0.5;
	wordWrap: number = 0;
	readonly numberCharList: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	readonly stringCharList: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	charListMode: string = "number";
	changeCharListMode(): void {
		if (this.charListMode == "number") this.charListMode = "string";
		else this.charListMode = "number";
	}

	get getCharList(): string[] {
		return this.charListMode == "number" ? this.numberCharList : this.stringCharList;
	}
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap");
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

button {
	cursor: pointer;
	outline: none;
	border: none;
	background-color: #42b883;
	color: white;
	font-size: 0.8em;
	padding: 5px;
	border-radius: 5px;

	transition: 0.2s;

	&:hover {
		filter: brightness(1.1);
	}
	&:active {
		background-color: #354952;
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

		.roller * {
			font-family: "Major Mono Display", monospace;
		}
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

		.roller {
			width: 300px !important;
			height: 300px !important;
		}
		.roller * {
			font-family: "Major Mono Display", monospace;
		}

		h2 {
			font-size: 2em;
			color: #42b883;
			margin-bottom: 20px;
		}
		label {
			margin-top: 20px;

			.charlist {
				font-size: 0.5em;
			}
		}
	}
	.app__footer {
		background-color: #354952;
		color: white;
		width: 100%;
		padding: 20px;
	}
}

@media all and (max-aspect-ratio: 3/4) {
	.app {
		.app__title {
			font-size: 3em;
		}
	}
}
@media all and (max-aspect-ratio: 1/2) {
	.app {
		.app__title {
			font-size: 2em;
		}
	}
}
</style>
