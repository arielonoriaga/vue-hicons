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

    strokeLinecap: {
      type: String,
      default: 'round'
    },

    strokeLinejoin: {
      type: String,
      default: 'round'
    },

    size: {
      type: [String, Number],
      default: '4'
    }
  },

  data: () => ({
    doublePath: false,
    isTriplePath: false,
    icon: {
      'path1': '',
      'path2': ''
    },
    iconsWithDoublePath: DoublePathIcons,
    filledIconsWithDoublePath: FilledDoublePathIcons,
    filledIconsWithTriplePaths: TriplePathFilledIcons,
  }),

  computed: {
    iconNameClass() {
      return this.name.split('_').join('-');
    },

    classIconFinal () {
      return `${this.iconNameClass} ${this.classIcon} w-${this.size} h-${this.size}`;
    },

    clipRuleData() {
      return this.name == 'volume_off' ? 'evenodd' : this.clipRule;
    },

    icons() {
      return this.isFilled
        ? icons.filled
        : icons;
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
      return this.isFilled && this.fillRulePath2 === '' && this.isDoublePath
        ? 'evenodd'
        : this.fillRulePath2;
    },

    clipRuleTwoPath() {
      return this.isFilled && this.clipRulePath2 === '' && this.isDoublePath
        ? this.clipRulePath2
        : 'evenodd';
    },

    isDoublePath() {
      return this.filledIconsWithDoublePath.includes(this.nameFormated);
    },

    nameFormated() {
      return this.name.toLowerCase().replace('-', '_');
    }
  },

  mounted() {
    this.buildIcon();
  },

  methods: {
    buildIcon() {
      this.buildIconStructure(this.nameFormated);
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
      return this.icons[this.nameFormated];
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
        path1,
        path2,
      } = this.getDoublePathIcon();

      const path3 = this.icons[this.nameFormated].path3;

      return { path1, path2, path3 };
    },

    getDoublePathIcon() {
      const {
        path1,
        path2,
      } = this.icons[this.nameFormated];

      return { path1, path2 };
    },
  }
};

// ".*-.*": REGEX TO SEARCH ANY -
</script>
