<template>
  <svg
    :stroke-width="strokeStyleComponent"
    :fill="fillStyleComponent"
    :viewBox="viewBoxComponent"
    :class="classIconFinal"
    :stroke="strokeColor"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    @click="$emit('click')"
  >

    <path
      :d="icon.path1"
      :fill-rule="fillRuleBasicPath"
      :clip-rule="clipRuleBasicPath"
    />

    <path
      v-if="doublePath || isTriplePath"
      :d="icon.path2"
      :fill-rule="fillRuleTwoPath"
      :clip-rule="clipRuleTwoPath"
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

import DoublePathIcons from "./assets/DoublePathIcons";
import FilledDoublePathIcons from "./assets/FilledDoublePathIcons";
import TriplePathFilledIcons from "./assets/TriplePathFilledIcons";

export default {
  name: 'VueHicons',

  props: {
    clipRule: {
      type: String,
      default: ''
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

    isFilled: {
      type: Boolean,
      default: false
    },

    fillColor: {
      type: String,
      default: 'none'
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
      default: 'currentColor'
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
      default: 'round'
    },

    strokeLinejoin: {
      type: String,
      default: 'round'
    }
  },

  data: () => ({
    doublePath: false,
    isTriplePath: false,
    icon: {
      'path1': '',
      'path2': ''
    },
    icons: icons,
    iconsWithDoublePath: DoublePathIcons,
    filledIconsWithDoublePath: FilledDoublePathIcons,
    filledIconsWithTriplePaths: TriplePathFilledIcons,
  }),

  computed: {
    iconNameClass() {
      return this.name.split('_').join('-');
    },

    classIconFinal () {
      return this.heightIcon == 4
        ? `${this.iconNameClass} ${this.classIcon} w-${this.widthIcon}`
        : `${this.iconNameClass} ${this.classIcon} w-${this.widthIcon} h-${this.heightIcon}`;
    },

    clipRuleData() {
      return this.name == 'volume_off' ? 'evenodd' : this.clipRule;
    },

    stringIconsJSON() {
      const jsonString = JSON.stringify(this.icons);

      return this.isFilled
        ? jsonString.split(`"filled":{`)[1]
        : jsonString;
    },

    strokeStyleComponent() {
      return this.isFilled && this.strokeWidth === 2
        ? 0
        : this.strokeWidth;
    },

    fillStyleComponent() {
      return this.isFilled && this.fillColor === 'none'
        ? 'currentColor'
        : this.fillColor;
    },

    viewBoxComponent() {
      return this.isFilled && this.viewBox === '0 0 24 24'
        ? '0 0 20 20'
        : this.viewBox;
    },

    fillRuleBasicPath() {
      return this.isFilled && this.fillRule === 'nonzero'
        ? 'evenodd'
        : this.fillRule;
    },

    clipRuleBasicPath() {
      return this.isFilled && this.clipRuleData === 'nonzero'
        ? 'evenodd'
        : this.clipRuleData;
    },

    fillRuleTwoPath() {
      return this.isFilled && this.fillRulePath2 === '' && this.filledIconsWithDoublePath.includes(this.name)
        ? 'evenodd'
        : this.fillRulePath2;
    },

    clipRuleTwoPath() {
      return this.isFilled && this.clipRulePath2 === '' && this.filledIconsWithDoublePath.includes(this.name)
        ? this.clipRulePath2
        : 'evenodd';
    }
  },

  mounted() {
    this.buildIcon();
  },

  methods: {
    normalize(text) {
      return text.toLowerCase().replace('-', '_');
    },

    buildIcon() {
      const iconName = this.normalize(this.name);

      this.buildIconStructure(iconName);
    },

    buildIconStructure(name) {
      if(this.isFilled && this.filledIconsWithTriplePaths.includes(name)) {
        this.generateTriplePathIcon();

        return;
      }

      this.generateIcon(name);
    },

    generateIcon(name) {
      const isDoublePath = this.isFilled
        ? this.filledIconsWithDoublePath.includes(name)
        : this.iconsWithDoublePath.includes(name);

      isDoublePath
        ? this.buildIconDoublePath()
        : this.icon.path1 = this.getIconPath();
    },

    getIconPath() {
      return this.stringIconsJSON
        .split(`"${this.name}":"`)[1]
        .split('","')[0];
    },

    buildIconDoublePath() {
      this.doublePath = true;

      this.icon = this.getDoublePathIcon();
    },

    generateTriplePathIcon() {
      this.isTriplePath = true;

      this.icon = this.icosWithTriplePathFilled();
    },

    icosWithTriplePathFilled() {
      const {
        paths,
        path1,
        path2,
      } = this.getDoublePathIcon();

      const [path3] = paths[1].split('","path3":"')[1].split('"');

      return { path1, path2, path3 };
    },

    getDoublePathIcon() {
      const paths = this.stringIconsJSON
        .split(`"${this.name}":{`)[1]
        .split(`},"`)[0]
        .split(`path1":"`)[1]
        .split('","path2":"');

      const [path1] = paths;
      const [path2] = paths[1].split(`"`);

      return { paths, path1, path2 };
    },
  }
};

// ".*-.*": REGEX TO SEARCH ANY -
</script>
