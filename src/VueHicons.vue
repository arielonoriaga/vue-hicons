<template>
  <svg
    :stroke-width="strokeWidth"
    :class="classIconFinal"
    :fill="fillColor"
    :stroke="strokeColor"
    :viewBox="viewBox"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
  >

    <path
      :d="icon.path1"
      :fillRule="fillRule"
      :clip-rule="clipRuleData"
    />

    <path
      v-if="doublePath"
      :d="icon.path2"
    />
  </svg>
</template>

<script>
import './assets/css/tailwind.css'
import icons from './assets/icons.json';

export default {
  name: "vue-hicons",

  props: {
    clipRule: {
      type: String,
      default: 'nonzero'
    },

    name: {
      type: String,
      required: true
    },

    filled: {
      type: Boolean,
      default: false
    },

    fillColor: {
      type: String,
      default: "none"
    },

    fillRule: {
      type: String,
      default: 'nonzero'
    },

    classIcon: {
      type: String,
      default: ''
    },

    heightIcon: {
      type: Number,
      default: 4
    },

    strokeColor: {
      type: String,
      default: "currentColor"
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    viewBox: {
      type: String,
      default: '0 0 24 24'
    },

    widthIcon: {
      type: Number,
      default: 4
    },

    strokeLinecap: {
      type: String,
      default: "round"
    },

    strokeLinejoin: {
      type: String,
      default: "round"
    }
  },

  data() {
    return {
      doublePath: false,
      icon: {
        "path1": '',
        "path2": ''
      },
      icons: icons,
      iconsWithDoublePath: [
        "chart_pie",
        "chevron_double_right",
        "chip",
        "cog",
        "eye",
        "fire",
        "location_marker",
        "play",
        "stop",
        "truck",
        "volume_off"
      ],
      filledIconsWithDoublePath: [
        "archive"
      ],
    };
  },

  computed: {
    iconNameClass() {
      return this.name.split("_").join("-");
    },

    classIconFinal () {
      return (this.heightIcon == 4)
        ? `${this.iconNameClass} ${this.classIcon} w-${this.widthIcon}`
        : `${this.iconNameClass} ${this.classIcon} w-${this.widthIcon} h-${this.heightIcon}`;
    },

    clipRuleData() {
      return this.name == "volume_off" ? "evenodd" : this.clipRule;
     }
  },

  mounted() {
    this.buildIcon();
  },

  methods: {
    icosSinDoblePath() {
      let ico = !this.filled
        ? JSON.stringify(this.icons).split(`"${this.name}":"`)[1].split('"')[0]
        : JSON.stringify(this.icons).split(`"filled":{"`)[1].split(`"${this.name}":"`)[1].split('"')[0];

      return ico;
    },

    icosWithDoublePath() {
      let paths = !this.filled
        ? JSON.stringify(this.icons).split(`"${this.name}":{`)[1].split(`},"`)[0].split(`path1":"`)[1].split(`","path2":"`)
        : JSON.stringify(this.icons).split(`"filled":{"`)[1].split(`"${this.name}":{`)[1].split('},"')[0].split('path1":"')[1].split(`","path2":"`);

      return {
        "path1": paths[0],
        "path2": paths[1].split(`"`)[0]
      };
    },

    buildIcon() {
      if (!this.iconsWithDoublePath.includes(`${this.name}`) && !this.filledIconsWithDoublePath.includes(`${this.name}`)) {
        this.icon.path1 = this.icosSinDoblePath();

      } else {
        this.buildIconDoublePath();
      }
    },

    buildIconDoublePath() {
        this.doublePath = true;

        let temporalJSONWithDoblePath = this.icosWithDoublePath();

        this.icon.path1 = temporalJSONWithDoblePath.path1;
        this.icon.path2 = temporalJSONWithDoblePath.path2;
    }
  }
};

// ".*-.*": REGEX TO SEARCH ANY -
</script>
