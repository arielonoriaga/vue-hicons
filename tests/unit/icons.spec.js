import { shallowMount } from '@vue/test-utils';
import iconsComponent from '@/VueHicons';

import iconsJSON from "@/assets/icons.json";
const icons = iconsJSON;

describe('VueHicons', () => {
  const wrapper = shallowMount(iconsComponent, {
    propsData: {
      name: 'x',
      isFilled: false
    }
  });

  beforeEach(() => {
    wrapper.setProps({
      name: 'x',
      isFilled: false,
      strokeWidth: 2,
      clipRule: 'nonzero',
      fillRulePath2: '',
      clipRulePath2: '',
      fillColor: 'none',
      fillRule: 'nonzero',
      strokeColor: 'currentColor',
      viewBox: '0 0 24 24'
    });
  });

  it('basic test', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  describe("computeds", () => {
    it("iconNameClass basic", () => {
      expect(iconsComponent.computed.iconNameClass.call(wrapper.vm))
        .toBe('x');
    });

    it("classIconFinal", () => {
      expect(iconsComponent.computed.classIconFinal.call(wrapper.vm))
        .toBe('x  w-4');
    });

    it("classIconFinal with other width and class", async () => {
      wrapper.setProps({
        name: "arrow_left",
        isFilled: false,
        classIcon: "bg-red-200",
        widthIcon: "6",
        heightIcon: "6"
      });

      await wrapper.vm.$nextTick();

      expect(iconsComponent.computed.classIconFinal.call(wrapper.vm))
        .toBe('arrow-left bg-red-200 w-6 h-6');
    });

    it("strokeStyleComponent not default value stroke", () => {
      wrapper.setProps({
        isFilled: true,
        strokeWidth: 1
      });

      expect(
        iconsComponent.computed.strokeStyleComponent.call(wrapper.vm)
      ).toBe(1);
    });

    it("strokeStyleComponent default value stroke", () => {
      wrapper.setProps({
        isFilled: true
      });

      expect(
        iconsComponent.computed.strokeStyleComponent.call(wrapper.vm)
      ).toBe(0);
    });

    it("strokeStyleComponent default value stroke icon not filled", () => {
      expect(
        iconsComponent.computed.strokeStyleComponent.call(wrapper.vm)
      ).toBe(2);
    });

    it("fillStyleComponent default value filled", () => {
      wrapper.setProps({
        isFilled: true,
      });

      expect(
        iconsComponent.computed.fillStyleComponent.call(wrapper.vm)
      ).toBe('currentColor');
    });

    it("fillStyleComponent not default value filled", () => {
      wrapper.setProps({
        isFilled: true,
        fillColor: 'red'
      });

      expect(
        iconsComponent.computed.fillStyleComponent.call(wrapper.vm)
      ).toBe('red');
    });

    it("fillStyleComponent not default value", () => {
      expect(
        iconsComponent.computed.fillStyleComponent.call(wrapper.vm)
      ).toBe('none');
    });

    it("viewBoxComponent default value filled", () => {
      wrapper.setProps({
        isFilled: true
      });

      expect(
        iconsComponent.computed.viewBoxComponent.call(wrapper.vm)
      ).toBe('0 0 20 20');
    });

    it("viewBoxComponent not default value filled", () => {
      wrapper.setProps({
        isFilled: true,
        viewBox: '0 0 23 23'
      });

      expect(
        iconsComponent.computed.viewBoxComponent.call(wrapper.vm)
      ).toBe('0 0 23 23');
    });

    it("viewBoxComponent not default value", () => {
      wrapper.setProps({
        isFilled: false,
        viewBox: '0 0 23 23'
      });

      expect(
        iconsComponent.computed.viewBoxComponent.call(wrapper.vm)
      ).toBe('0 0 23 23');
    });

    it("fillRuleBasicPath default value filled", () => {
      wrapper.setProps({
        isFilled: true,
      });

      expect(
        iconsComponent.computed.fillRuleBasicPath.call(wrapper.vm)
      ).toBe('evenodd');
    });

    it("fillRuleBasicPath not default value filled", () => {
      wrapper.setProps({
        isFilled: true,
        fillRule: 'nonzeros'
      });

      expect(
        iconsComponent.computed.fillRuleBasicPath.call(wrapper.vm)
      ).toBe('nonzeros');
    });

    it("fillRuleBasicPath default value no filled", () => {
      expect(
        iconsComponent.computed.fillRuleBasicPath.call(wrapper.vm)
      ).toBe('nonzero');
    });

    it("clipRuleBasicPath default value filled", () => {
      wrapper.setProps({
        isFilled: true
      });

      expect(
        iconsComponent.computed.clipRuleBasicPath.call(wrapper.vm)
      ).toBe('evenodd');
    });

    it("clipRuleBasicPath not default value filled", () => {
      wrapper.setProps({
        isFilled: true,
        clipRule: 'nonzeros'
      });

      expect(
        iconsComponent.computed.clipRuleBasicPath.call(wrapper.vm)
      ).toBe('nonzeros');
    });

    it("clipRuleBasicPath not default value not filled", () => {
      expect(
        iconsComponent.computed.clipRuleBasicPath.call(wrapper.vm)
      ).toBe('nonzero');
    });

    it("fillRuleTwoPath default value filled", () => {
      wrapper.setProps({
        isFilled: true
      });

      expect(
        iconsComponent.computed.fillRuleTwoPath.call(wrapper.vm)
      ).toBe('');
    });

    it("fillRuleTwoPath default value filled", () => {
      wrapper.setProps({
        isFilled: true,
        name: 'eye',
        fillRulePath2: 'juan'
      });

      expect(
        iconsComponent.computed.fillRuleTwoPath.call(wrapper.vm)
      ).toBe('juan');
    });
  });

  describe("methods outline", () => {
    it("buildIcon simple path", () => {
      wrapper.setProps({
        name: 'adjustments'
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.icon.path1)
        .toBe(icons.adjustments);

      expect(wrapper.vm.icosSinDoblePath())
        .toBe(icons.adjustments);
    });

    it("buildIcon double path", () => {
      wrapper.setProps({
        name: "volume_off"
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.doublePath)
        .toBeTruthy();

      expect(wrapper.vm.$data.icon.path1)
        .toBe(icons.volume_off.path1);

      expect(wrapper.vm.$data.icon.path2)
        .toBe(icons.volume_off.path2);
    });

    it("double path", () => {
      wrapper.setProps({
        name: "cog",
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.doublePath)
        .toBeTruthy();

      expect(wrapper.vm.icosWithDoublePath().path1)
        .toBe(icons.cog.path1);

      expect(wrapper.vm.icosWithDoublePath().path2)
        .toBe(icons.cog.path2);
    });
  });

  describe("methods filled", () => {
    beforeEach(() => {
      wrapper.setProps({
        isFilled:true
      });

      iconsComponent.computed.stringIconsJSON.call(wrapper.vm);
    });

    it("build icon single path filled", () => {
      wrapper.setProps({
        name: "adjustments",
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.icon.path1)
        .toBe(icons.filled.adjustments);

      expect(wrapper.vm.icosSinDoblePathFilled())
        .toBe(icons.filled.adjustments);
    });

    it("build icon double path filled", () => {
      wrapper.setProps({
        name: "currency_dollar",
        filled: true
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.doublePath)
        .toBeTruthy();

      expect(wrapper.vm.icosWithDoublePath().path1)
        .toBe(icons.filled.currency_dollar.path1);

      expect(wrapper.vm.icosWithDoublePath().path2)
        .toBe(icons.filled.currency_dollar.path2);
    });
  });

  describe("Triple Path", () => {
    it("icon database", () => {
      wrapper.setProps({
        name: "database",
        filled: true
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.icosWithTriplePathFilled().path1)
        .toBe(icons.filled.database.path1);

      expect(wrapper.vm.icosWithTriplePathFilled().path2)
        .toBe(icons.filled.database.path2);

      expect(wrapper.vm.icosWithTriplePathFilled().path3)
        .toBe(icons.filled.database.path3);
    });
  });
});
