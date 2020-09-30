import { shallowMount } from '@vue/test-utils';
import iconsComponent from '@/VueHicons';

import iconsJSON from "@/assets/icons.json";
const icons = iconsJSON;

describe('VueHicons', () => {
  const wrapper = shallowMount(iconsComponent, {
    propsData: {
      name: 'x',
      filled: false
    }
  });

  beforeEach(() => {
    wrapper.setProps({
      name: 'x',
      filled: false
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
        filled: false,
        classIcon: "bg-red-200",
        widthIcon: "6",
        heightIcon: "6"
      });

      await wrapper.vm.$nextTick();

      expect(iconsComponent.computed.classIconFinal.call(wrapper.vm))
        .toBe('arrow-left bg-red-200 w-6 h-6');
    });
  });

  describe("methods outline", () => {
    it("buildIcon simple path", () => {
      wrapper.setProps({
        name: 'adjustments',
        filled: false
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.icon.path1)
        .toBe(icons.adjustments);

      expect(wrapper.vm.icosSinDoblePath())
        .toBe(icons.adjustments);
    });

    it("buildIcon double path", () => {
      wrapper.setProps({
        filled: false,
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
        filled: false,
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
        filled:true
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
