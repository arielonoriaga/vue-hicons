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

export default {
  name: "VueHicons",

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

  data:() => ({
    doublePath: false,
    isTriplePath: false,
    icon: {
      'path1': '',
      'path2': ''
    },
    icons: icons,
    iconsWithDoublePath: [
      'chart_pie',
      'chevron_double_right',
      'chip',
      'cog',
      'eye',
      'fire',
      'location_marker',
      'play',
      'stop',
      'truck',
      'volume_off'
    ],
    filledIconsWithDoublePath: [
      'archive',
      'briefcase',
      'chat_alt2',
      'chevron_double_right',
      'chip',
      'clipboard',
      'clipboard_check',
      'clipboard_copy',
      'clipboard_list',
      'credit_card',
      'currency_dollar',
      'document_duplicate',
      'document_search',
      'duplicate',
      'external_link',
      'eye',
      'eye_off',
      'inbox_in',
      'mail',
      'newspaper',
      'pencil_alt',
      'phone_incoming',
      'phone_missed_call',
      'phone_outgoing',
      'qrcode',
      'rss',
      'save_as',
      'scissors',
      'search_circle',
      'truck',
      'zoom_in',
      'zoom_out'
    ],
    filledIconsWithTriplePaths: [
      'database',
      'finger_print'
    ]
  }),

  computed: {
    iconNameClass() {
      return this.name.split("_").join("-");
    },

    classIconFinal () {
      return this.heightIcon == 4
        ? `${this.iconNameClass} ${this.classIcon} w-${this.widthIcon}`
        : `${this.iconNameClass} ${this.classIcon} w-${this.widthIcon} h-${this.heightIcon}`;
    },

    clipRuleData() {
      return this.name == "volume_off" ? "evenodd" : this.clipRule;
    },

    stringIconsJSON() {
      return JSON.stringify(this.icons);
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
    buildIcon() {
      const iconName = this.name;

      if(!this.isFilled)
        this.buildNoFilledIcon(iconName);
      else
        this.buildFileldIcon(iconName);
    },

    buildNoFilledIcon(name) {
      if (this.iconsWithDoublePath.includes(name))
        this.buildIconDoublePath();
      else
        this.icon.path1 = this.icosSinDoblePath();
    },

    buildFileldIcon(name) {
      if(this.filledIconsWithTriplePaths.includes(name)) {
        this.buildIconTriplePathFilled();

        return;
      }

      if (this.filledIconsWithDoublePath.includes(name))
        this.buildIconDoublePathFilled();
      else
        this.icon.path1 = this.icosSinDoblePathFilled();
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
        .split('","path2":"');

      return {
        path1: paths[0],
        path2: paths[1].split(`"`)[0]
      };
    },

    icosWithDoublePathFilled() {
      let paths = this.stringIconsJSON
        .split('"filled":{')[1]
        .split(`"${this.name}":{`)[1]
        .split('},"')[0]
        .split('path1":"')[1]
        .split(`","path2":"`);

      return {
        path1: paths[0],
        path2: paths[1].split(`"`)[0]
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
        .split('"filled":{')[1]
        .split(`"${this.name}":{`)[1]
        .split('},"')[0]
        .split('path1":"')[1]
        .split('","path2":"');

      const path1 = paths[0];
      const path2 = paths[1].split('"')[0];
      const path3 = paths[1].split('","path3":"')[1].split('"')[0];

      return { path1, path2, path3 };
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
