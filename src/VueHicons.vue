<template>
  <svg
    :stroke-width="strokeStyleComponent"
    :fill="fillStyleComponent"
    :viewBox="viewBoxComponent"
    :class="classIconFinal"
    :stroke="strokeColor"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
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

  data() {
    return {
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
    },

    strokeStyleComponent() {
      if(this.isFilled) {
        return (this.strokeWidth !== 2)
          ? this.strokeWidth
          : 0;

      } else {
        return this.strokeWidth;
      }
    },

    fillStyleComponent() {
      if(this.isFilled) {
        return this.fillColor !== 'none'
          ? this.fillColor
          : 'currentColor';

      } else {
        return this.fillColor;
      }
    },

    viewBoxComponent() {
      if(this.isFilled) {
        return this.viewBox !== '0 0 24 24'
          ? this.viewBox
          : '0 0 20 20';

      } else {
        return this.viewBox;
      }
    },

    fillRuleBasicPath() {
      if(this.isFilled) {
        return this.fillRule !== 'nonzero'
          ? this.fillRule
          : 'evenodd';

      } else {
        return this.fillRule;
      }
    },

    clipRuleBasicPath() {
      if(this.isFilled) {
        return this.clipRuleData !== 'nonzero'
          ? this.clipRuleData
          : 'evenodd';

      } else {
        return this.clipRuleData;
      }
    },

    fillRuleTwoPath() {
      if(this.isFilled) {
        if(this.fillRulePath2 === '') {
          return this.filledIconsWithDoublePath.includes(this.name)
            ? 'evenodd'
            : '';

        } else {
          return this.fillRulePath2;
        }
      } else {
        return this.fillRulePath2;
      }
    },

    clipRuleTwoPath() {
      if(this.isFilled) {
        if(this.clipRulePath2 === '') {
          return this.filledIconsWithDoublePath.includes(this.name)
            ? 'evenodd'
            : '';

        } else {
          return this.clipRulePath2;
        }
      } else {
        return this.clipRulePath2;
      }
    }
  },

  mounted() {
    this.buildIcon();
  },

  methods: {
    buildIcon() {
      if (!this.iconsWithDoublePath.includes(`${this.name}`) && !this.isFilled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.icon.path1 = this.icosSinDoblePath();

      } else if (this.iconsWithDoublePath.includes(`${this.name}`) && !this.isFilled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.buildIconDoublePath();

      } else if (!this.filledIconsWithDoublePath.includes(`${this.name}`) && this.isFilled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.icon.path1 = this.icosSinDoblePathFilled();

      } else if (this.filledIconsWithDoublePath.includes(`${this.name}`)  && this.isFilled && !this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
        this.buildIconDoublePathFilled();

      } else if (!this.filledIconsWithDoublePath.includes(`${this.name}`) && this.isFilled && this.filledIconsWithTriplePaths.includes(`${this.name}`)) {
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
