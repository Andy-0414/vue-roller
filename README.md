![logo](https://github.com/andy-0414/vue-roller/blob/master/img/vue-roller.gif?raw=true)

[![License](https://img.shields.io/npm/l/vue-roller.svg?sanitize=true)](https://www.npmjs.com/package/vue-roller)
[![Version](https://img.shields.io/npm/v/vue-roller.svg?sanitize=true)](https://www.npmjs.com/package/vue-roller)

# vue-roller

Vue Rolling Count & Vue Rolling String

# Demo

![logo](https://github.com/andy-0414/vue-roller/blob/master/img/example1.gif?raw=true)
![logo](https://github.com/andy-0414/vue-roller/blob/master/img/example2.gif?raw=true)

[More](http://andy-0414.github.io/vue-roller)

# GET STARTED

npm

```
npm i vue-roller
```

Vue

```
import Roller from "vue-roller";

export default {
    components:{
        Roller
    }
}
...
```

Vue-typescript

```
import Roller from "vue-roller";

@Component({
	components: { Roller }
})
...
```

# Options

## text

```
<Roller text="1234">
```

display text

required

## transition

```
<Roller transition="1">
```

transition speed (s)

default:0.5

## isNumberFormat

```
<Roller isNumberFormat="true">
```

numberFormat (comma)

default:false

## charList

```
<Roller :charList="['a', 'b', 'c']">
```

roll char list

default:["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

## defaultChar

```
<Roller defaultChar="0">
```

start char (first load)

default:""
