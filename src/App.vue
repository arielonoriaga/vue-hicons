<template>
  <div id="app">
    <svg
      :stroke-width="strokeWidth"
      :class="classIconFinal"
      :fill="fillColor"
      :stroke="strokeColor"
      :viewBox="viewBox"
      stroke-linecap="round"
      stroke-linejoin="round"
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
  </div>
</template>

<script>
import icons from './assets/icons.json';

export default {
  name: "VIcons",

  props: {
    clipRule: {
      type: String,
      default: 'nonzero'
    },

    name: {
      type: String,
      required: true
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
      clipRuleData: 'nonzero'
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
    }
  },

  mounted() {
    this.buildIcon();
  },

  methods: {
    icosSinDoblePath() {
      let ico = (JSON.stringify(this.icons).split(`"${this.name}":"`));
      return ico[1].split('"')[0];
    },

    icosConDoblePath() {
      let paths = (((JSON.stringify(this.icons)
        .split(`${this.name}":{`))[1])
        .split(`},"`)[0])
        .split(`path1":"`)[1]
        .split(`","path2":"`);

      this.clipRuleData = (this.name == "volume_off")
        ? "evenodd"
        : this.clipRule;

      return {
        "path1": paths[0],
        "path2": paths[1].split(`"`)[0]
      };
    },

    buildIcon() {
      if (!this.iconsWithDoublePath.includes(`${this.name}`)) {
        this.icon.path1 = this.icosSinDoblePath();

      } else {
        this.doublePath = true;

        let temporalJSONWithDoblePath = this.icosConDoblePath();
        this.icon.path1 = temporalJSONWithDoblePath.path1;
        this.icon.path2 = temporalJSONWithDoblePath.path2;
      }
    }
  }
};
</script>
