<template>
	<div v-if="isStatic && isAnimationEnd" class="roller">
		<ul class="roller__char block" v-for="(t, idx) in getText" :key="getIndex(t, idx)">
			<li class="roller__char__item" :style="{ opacity: char == ' ' ? 0 : 1 }">{{t}}</li>
		</ul>
	</div>
	<transition-group tag="div" name="roller" class="roller" v-else>
		<ul
			class="roller__char block"
			v-for="(t, idx) in getText"
			:key="getIndex(t, idx)"
			:style="{ top: `-${findCharIndex(t) * 100}%`, height: `${charList.length * 100}%`, transition: `${transition}s` }"
		>
			<li
				class="roller__char__item"
				v-for="char in findCharIndex(t, true) != -1 ? charList : [t]"
				:key="char"
				:style="{ opacity: char == ' ' ? 0 : 1 }"
			>{{ char == " " ? "l" : char }}</li>
		</ul>
	</transition-group>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { PropType } from "vue";

@Component
export default class Roller extends Vue {
	@Prop({ default: "0000", type: String as PropType<string>, required: true })
	readonly text!: string;
	@Prop({ default: false, type: Boolean as PropType<boolean> })
	readonly isNumberFormat!: boolean;
	@Prop({ default: false, type: Boolean as PropType<boolean> })
	readonly isStatic!: boolean;
	@Prop({
		default: () => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		type: Array as PropType<string[]>
	})
	readonly charList!: string[];
	@Prop({ default: 0.5, type: Number as PropType<number> })
	readonly transition!: number;
	@Prop({ default: "", type: String as PropType<string> })
	readonly defaultChar!: string;

	format = new Intl.NumberFormat().format; // number comma
	isRollStart: boolean = false; // rolling start (0.2s)
	isAnimationEnd = false; // transition end (transition s)

	mounted() {
		// 0.2s start
		setTimeout(() => {
			this.isRollStart = true;
			// transition end
			setTimeout(() => {
				this.isAnimationEnd = true;
			}, this.transition * 1000);
		}, 200);
	}
	// get pre processing text
	get getText(): string[] {
		// is component start
		if (this.isRollStart) {
			if (this.isNumberFormat) {
				// number comma enable
				return this.format(Number(this.text))
					.toString()
					.split("");
			} else {
				// number comma disable
				return String(this.text).split("");
			}
		} else {
			if (this.isNumberFormat) {
				// number comma enable
				return this.format(Number(this.text))
					.toString()
					.split("")
					.map((s, idx) =>
						s == ","
							? ","
							: this.defaultChar[idx] || this.defaultChar[0]
					);
			} else {
				// number comma disable
				return [...Array(String(this.text).length)].map(
					(_, idx) => this.defaultChar[idx] || this.defaultChar[0]
				);
			}
		}
	}
	// get char index
	getIndex(t: string, idx: number): string {
		if (!this.isIncludeCharList(t)) {
			if (!t.trim()) return "NULL" + idx;
			else return t + idx;
		}
		// comma match
		let reg = this.getText
			.join("")
			.substring(0, idx + 1)
			.match(/,/gi);
		return (idx - (reg ? reg!.length : 0)).toString();
	}
	// is include char list
	isIncludeCharList(t: string): boolean {
		return this.charList.indexOf(t) != -1;
	}
	// get char index
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
.block {
	padding: 0 !important;
	margin-top: 0 !important;
	margin-bottom: 0 !important;
}
</style>
