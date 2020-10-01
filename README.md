# Vue-Hicons

## Project setup
```
npm i -s vue-hicons@latest
```

### How to import this dependency

To import the component correctly we have to use the following import in the component that we want to use

```
import VueHicons from "vue-hicons"
```

And then we must add it in components

```
export default {
  components: {
    VueHicons
  }
}
```

### Usage guide

| Prop | Type | Default | Required |
| ---- | ---- | ------- | -------- |
| class-icon | String | - | false |
| clip-rule | String | nonzero | false |
| clip-rule-path2 | String | - | false |
| filled | Boolean | false | false |
| fill-color | String | none | false |
| fill-rule | String | nonzero | false |
| fill-rule-path2 | String | - | false |
| height-icon | Number | - | false |
| name | String | x | true |
| stroke-color | String | #000 | false |
| stroke-linecap | String | round | false |
| stroke-linejoin | String | round | false |
| stroke-width | Number | 2 | false |
| view-box | String | 0 0 24 24 | false |
| width-icon | Number | 4 | false |


### Caution

If the name of the icon contains a - \(hyphen\) it must be called with _ \(underscore\)

Example:

```
  arrow-left -> arrow_left

  <VueHicons name="arrow_left">
```

Another point to keep in mind is that if you use the filled icons, surely in its second label fill-rule and clip-rule you should put the value evenodd, this you can see when you copy a heroicons icon and paste it somewhere, for example, in the google devtools console

(Soon these cases will be detected only and it will not be necessary to add more tags to our component)

Example:

```
<VueHicons
  name="archive",
  :filled="true"
  view-box="0 0 20 20"
  stroke-color="none",
  fill-color="currentColor"
  clip-rule-path2="evenodd"
  fill-rule-path2="evenodd"
>
```

### Supported icons
Heroicons: https://heroicons.dev/
