# vue-roller

[![License](https://img.shields.io/npm/l/vue-roller.svg?sanitize=true)](https://www.npmjs.com/package/vue-roller)
[![Version](https://img.shields.io/npm/v/vue-roller.svg?sanitize=true)](https://www.npmjs.com/package/vue-roller)

Vue Rolling Count & Vue Rolling String

# Demo

http://andy-0414.github.io/vue-roller

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

transition speed

default = 0.5

## isNumberFormat

```
<Roller isNumberFormat="true">
```

numberFormat (comma)

default - false

## charList

```
<Roller :charList="['a', 'b', 'c']">
```

roll char list

default - ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
