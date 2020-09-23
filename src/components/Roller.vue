<template>
	<div v-if="isStatic && isAnimationEnd" class="roller">
		<component :is="t != '\n' ? 'div' : 'br'" class="roller__char rollerBlock" v-for="(t, idx) in getText" :key="getIndex(t, idx)" :style="{ opacity: t == ' ' ? 0 : 1 }">
			{{ t == " " ? "-" : t }}
		</component>
	</div>
	<transition-group tag="div" name="roller" class="roller" v-else>
		<component :is="t != '\n' ? 'div' : 'br'" class="roller__wrapper" v-for="(t, idx) in getText" :key="getIndex(t, idx)">
			<ul
				v-if="t != '\n'"
				class="roller__char rollerBlock"
				:style="{ top: `${isRollStart ? findCharIndex(t) * -100 : getDefaultCharIndex(idx) * -100}%`, height: `${charList.length * 100}%`, transition: `${transition}s` }"
			>
				<li class="roller__char__item" :class="{ copyable: t == char }" v-for="char in findCharIndex(t, true) != -1 ? charList : [t]" :key="char" :style="{ opacity: char == ' ' ? 0 : 1 }">
					{{ char == " " ? "-" : char }}
				</li>
			</ul>
		</component>
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
		type: Array as PropType<string[]>,
	})
	readonly charList!: string[];
	@Prop({ default: 0.5, type: Number as PropType<number> })
	readonly transition!: number;
	@Prop({ default: "", type: String as PropType<string> })
	readonly defaultChar!: string;
	@Prop({ default: 0, type: Number as PropType<number> })
	readonly wordWrap!: number;

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
				this.$emit("animationend", true);
			}, this.transition * 1000 + 200);
		}, 200);
	}

	// get pre processing text
	get getText(): string[] {
		let wrapText: string;

		if (this.wordWrap) {
			const wrap = (s: string, w: number) => s.replace(new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, "g"), "$1\n");
			wrapText = wrap(this.text, this.wordWrap);
		} else {
			wrapText = String(this.text);
		}

		// is component start
		if (this.isNumberFormat) {
			// number comma enable
			return this.format(Number(wrapText))
				.toString()
				.split("");
		} else {
			// number comma disable
			return String(wrapText).split("");
		}
	}
	// get default char index
	getDefaultCharIndex(idx: number): number {
		let result = this.charList.indexOf(this.defaultChar[idx] || this.defaultChar[0]);
		return result == -1 ? 0 : result;
	}
	// get char index
	getIndex(t: string, idx: number): string {
		if (!this.isIncludeCharList(t)) {
			if (!String(t).trim()) return "NULL" + idx;
			else return String(t) + String(idx);
		}
		if (this.isNumberFormat) {
			// comma match
			let reg = this.getText
				.join("")
				.substring(0, idx + 1)
				.match(/,/gi);
			return (idx - (reg ? reg!.length || 0 : 0)).toString();
		}

		return idx.toString();
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
	transition: top 0.75s, opacity 0.75s, width 0.75s;
}
.roller-leave-active {
	position: absolute;
}
.roller-item {
	transition: 0.5s;
}
.roller-move {
	transition: 0.5s;
}
.roller-enter {
	opacity: 0;
	.roller__char {
		top: 100% !important;
	}
}
.roller-enter-to {
	opacity: 1;
}
.roller-leave {
	opacity: 1;
	width: 1em;
}
.roller-leave-to {
	opacity: 0;
	width: 0;
	.roller__char {
		top: 100% !important;
	}
}

.roller {
	flex-wrap: wrap;
	overflow: hidden;
	width: fit-content;

	.roller__wrapper {
		display: inline-flex;

		position: relative;
		height: 1.5em !important;
		overflow: hidden;

		mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
		-webkit-mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
	}
	/* hr.roller__wrapper {
		margin-left: 100%;
		height: 0 !important;
		border: none;
	} */
	.roller__char {
		display: inline-flex;
		line-height: 1.5em;

		transition: 0.5s;

		position: relative;
		list-style: none;
		flex-direction: column;

		.roller__char__item {
			user-select: none;
			flex: 1;
		}
		.copyable {
			user-select: all;
		}
	}
}
.block {
	padding: 0 !important;
	margin-top: 0 !important;
	margin-bottom: 0 !important;
}
</style>
