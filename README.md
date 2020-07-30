![Animated logo](https://github.com/andy-0414/vue-roller/blob/master/img/vue-roller.webp?raw=true)

[![License](https://img.shields.io/npm/l/vue-roller.svg?sanitize=true)](https://www.npmjs.com/package/vue-roller)
[![Version](https://img.shields.io/npm/v/vue-roller.svg?sanitize=true)](https://www.npmjs.com/package/vue-roller)

# vue-roller

Fluid and smooth rolling animation for Vue.js

# Demo

![Animated Demo](https://github.com/andy-0414/vue-roller/blob/master/img/example1.webp?raw=true)
![Animated Demo](https://github.com/andy-0414/vue-roller/blob/master/img/example2.webp?raw=true)

Try out [here](http://andy-0414.github.io/vue-roller) with your own text!

# Getting Started

npm

```sh
npm i vue-roller
```

Vue

```js
import Roller from "vue-roller";

export default {
    components:{
        Roller
    }
}
...
```

Vue-typescript

```js
import Roller from "vue-roller";

@Component({
	components: { Roller }
})
...
```

# Options

## text (Required)

```html
<Roller text="1234"></Roller>
```

Displays text.

## transition

```html
<Roller :transition="1"></Roller>
```

Sets the time for the animation to complete in second(s). `0.5` by default.

## isNumberFormat

```html
<Roller :isNumberFormat="true"></Roller>
```

Can be set to `true` if you want to display commas as thousands separators. `false` by default.

## isStatic

```html
<Roller :isStatic="true"></Roller>
```

default : false
Used for disposable animation. (Performance improvement)

## charList

```html
<Roller :charList="['a', 'b', 'c']"></Roller>
```

Sets the list of characters used for the animation.

Default: `["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]`

## defaultChar

```html
<Roller defaultChar="0"></Roller>
```

Sets the text to display when the page is first loaded (before the animation actually starts).

Must be included in charList.

`""` by default.

## wordWrap

```html
<Roller :wordWrap="20"></Roller>
```

Sets the number of line break characters (word-break: keep-all)

`0` by default. (word-break: break-all)

## Event : animationend

```html
<Roller @animationend="event"></Roller>
```

Call the event at the end of the animation.

# Style

```html
<Roller class="roller"></Roller>

<style>
	.roller .rollerBlock {
		font-family: ~~~;
		margin: 20px;
	}
</style>
```
