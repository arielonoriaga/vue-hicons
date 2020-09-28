# Vue-Hicons

## Project setup
```
npm i -s vue-hicons
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
| fill-color | String | none | false |
| fill-rule | String | nonzero | false |
| height-icon | Number | - | false |
| name | String | x | true |
| stroke-color | String | #000 | false |
| stroke-width | Number | 2 | false |
| view-box | String | 0 0 24 24 | false |
| width-icon | Number | 4 | false |

If the name of the icon contains a - \(hyphen\) it must be called with _ \(underscore\)

example:

```
  arrow-left -> arrow_left

  <VueHicons name="arrow_left">
```


### Supported icons
Heroicons: https://heroicons.dev/
