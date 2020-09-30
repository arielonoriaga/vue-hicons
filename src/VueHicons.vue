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
      :fill-rule="fillRule"
      :clip-rule="clipRuleData"
    />

    <path
      v-if="doublePath || isTriplePath"
      :d="icon.path2"
      :fill-rule="fillRulePath2"
      :clip-rule="clipRulePath2"
    />

    <path
      v-if="isTriplePath"
      :d="icon.path3"
    />
  </svg>
</template>

<script>
import './assets/css/tailwind.css';
import icons from './assets/icons.json';

export default {
  name: "VueHicons",

  props: {
    clipRule: {
      type: String,
      default: 'nonzero'
    },

    fillRulePath2: {
      type: String,
      default: ''
    },

    clipRulePath2: {
      type: String,
      default: ''
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
      isTriplePath: false,
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
        "archive",
        "briefcase",
        "chat_alt2",
        "chevron_double_right",
        "chip",
        "clipboard",
        "clipboard_check",
        "clipboard_copy",
        "clipboard_list",
        "credit_card",
        "currency_dollar",
        "document_duplicate",
        "document_search",
        "duplicate",
        "external_link",
        "eye",
        "eye_off",
        "inbox_in",
        "mail",
        "newspaper",
        "pencil_alt",
        "phone_incoming",
        "phone_missed_call",
        "phone_outgoing",
        "qrcode",
        "rss",
        "save_as",
        "scissors",
        "search_circle",
        "truck",
        "zoom_in",
        "zoom_out"
      ],
      filledIconsWithTriplePaths: [
        "database",
        "finger_print"
      ]
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
    },

    stringIconsJSON() {
      return JSON.stringify(this.icons);
    }
  },

  mounted() {
    this.buildIcon();
  },

  methods: {
    buildIcon() {
      if (!this.iconsWithDoublePath.includes(`${this.name}`) && !this.filled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.icon.path1 = this.icosSinDoblePath();

      } else if (this.iconsWithDoublePath.includes(`${this.name}`) && !this.filled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.buildIconDoublePath();

      } else if (!this.filledIconsWithDoublePath.includes(`${this.name}`) && this.filled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.icon.path1 = this.icosSinDoblePathFilled();

      } else if (this.filledIconsWithDoublePath.includes(`${this.name}`)  && this.filled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.buildIconDoublePathFilled();

      } else if (!this.filledIconsWithDoublePath.includes(`${this.name}`) && this.filled && this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.buildIconTriplePathFilled();
      }
    },

    icosSinDoblePath() {
      return this.stringIconsJSON
        .split(`"${this.name}":"`)[1]
        .split('"')[0];
    },

    icosSinDoblePathFilled() {
      return this.stringIconsJSON
        .split(`"filled":{`)[1]
        .split(`"${this.name}":"`)[1]
        .split('","')[0];
    },

    icosWithDoublePath() {
      let paths = this.stringIconsJSON
        .split(`"${this.name}":{`)[1]
        .split(`},"`)[0].split(`path1":"`)[1]
        .split(`","path2":"`);

      return {
        "path1": paths[0],
        "path2": paths[1].split(`"`)[0]
      };
    },

    icosWithDoublePathFilled() {
      let paths = this.stringIconsJSON
        .split(`"filled":{`)[1]
        .split(`"${this.name}":{`)[1]
        .split('},"')[0]
        .split('path1":"')[1]
        .split(`","path2":"`);

      return {
        "path1": paths[0],
        "path2": paths[1].split(`"`)[0]
      };
    },

    buildIconDoublePath() {
      this.doublePath = true;

      let temporalJSONWithDoblePath = this.icosWithDoublePath();

      this.icon.path1 = temporalJSONWithDoblePath.path1;
      this.icon.path2 = temporalJSONWithDoblePath.path2;
    },

    buildIconDoublePathFilled() {
      this.doublePath = true;

      let temporalJSONWithDoblePath = this.icosWithDoublePathFilled();

      this.icon.path1 = temporalJSONWithDoblePath.path1;
      this.icon.path2 = temporalJSONWithDoblePath.path2;
    },

    icosWithTriplePathFilled() {
      let paths = this.stringIconsJSON
        .split(`"filled":{`)[1]
        .split(`"${this.name}":{`)[1]
        .split('},"')[0]
        .split('path1":"')[1]
        .split(`","path2":"`);

      return {
        "path1": paths[0],
        "path2": paths[1].split(`"`)[0],
        "path3": paths[1].split('","path3":"')[1].split('"')[0]
      };
    },

    buildIconTriplePathFilled() {
      this.isTriplePath = true;

      let temporalJSONWithDoblePath = this.icosWithTriplePathFilled();

      this.icon.path1 = temporalJSONWithDoblePath.path1;
      this.icon.path2 = temporalJSONWithDoblePath.path2;
      this.icon.path3 = temporalJSONWithDoblePath.path3;
    }
  }
};

// ".*-.*": REGEX TO SEARCH ANY -
</script>
