<template>
	<transition-group tag="div" name="roller" class="roller">
		<ul
			class="roller__char"
			v-for="(t,idx) in getText"
			:key="getIndex(t,idx)"
			:style="{'top':`-${findCharIndex(t)*100}%`,'height':`${charList.length*100}%`,'transition':`${transition}s`}"
		>
			<li
				class="roller__char__item"
				v-for="char in findCharIndex(t,true) != -1 ? charList : [t]"
				:key="char"
				:style="{'opacity':char == ' ' ? 0 : 1}"
			>{{char == " " ? "l": char}}</li>
		</ul>
	</transition-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Roller extends Vue {
	@Prop({ default: 1234 }) number!: number | string;
	@Prop({ default: false }) isDecimalSeparator!: boolean;
	@Prop({ default: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] })
	charList!: string;
	@Prop({ default: 0.5 }) transition!: number;

	format = new Intl.NumberFormat().format;
	isRollStart = false;

	mounted() {
		setTimeout(() => {
			this.isRollStart = true;
		}, 500);
	}

	get getText(): string[] {
		if (!this.isRollStart) return [""];
		if (this.isDecimalSeparator) {
			return this.format(Number(this.number))
				.toString()
				.split("");
		} else {
			return String(this.number).split("");
		}
	}

	getIndex(t: string, idx: number): string {
		if (!this.isIncludeCharList(t)) {
			if (!t.trim()) return "NULL" + idx;
			else return t + idx;
		}
		let reg = this.getText
			.join("")
			.substring(0, idx + 1)
			.match(/,/gi);
		return (idx - (reg ? reg!.length : 0)).toString();
	}
	isIncludeCharList(t: string): boolean {
		return this.charList.indexOf(t) != -1;
	}

	findCharIndex(t: string, isOriginal: boolean = false) {
		let idx = this.charList.indexOf(t);
		if (idx == -1 && !isOriginal) return 0;
		else return idx;
	}
}
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;

	box-sizing: border-box;
}
.roller-leave-active,
.roller-enter-active {
	transition: top 0.75s, opacity 0.75s;
}
.roller-leave-active {
	position: absolute !important;
}
.roller-move {
	transition: 0.5s;
}
.roller-enter {
	opacity: 0;
	top: 100% !important;
}
.roller-enter-to {
	opacity: 1;
}
.roller-leave {
	opacity: 1;
}
.roller-leave-to {
	opacity: 0;
	top: 100% !important;
}
.roller {
	position: relative;
	height: 1.5em;
	line-height: 1.5em;
	overflow: hidden;

	mask-image: linear-gradient(
		0deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(0, 0, 0, 1) 25%,
		rgba(0, 0, 0, 1) 75%,
		rgba(255, 255, 255, 0) 100%
	);
	-webkit-mask-image: linear-gradient(
		0deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(0, 0, 0, 1) 25%,
		rgba(0, 0, 0, 1) 75%,
		rgba(255, 255, 255, 0) 100%
	);
	.roller__char {
		display: inline-flex;
		line-height: 1.5em;

		transition: 0.5s;

		position: relative;
		list-style: none;
		flex-direction: column;

		.roller__char__item {
			flex: 1;
		}
	}
}
</style>
