import { shallowMount } from '@vue/test-utils';
import app from '@/app.vue';

import iconsJSON from "@/assets/icons.json";

const icons = iconsJSON;
describe('icons.vue', () => {
  const wrapper = shallowMount(app, {
    propsData: {
      name: 'x'
    }
  });

  beforeEach(() => {
    wrapper.setProps({
      name: 'x'
    });
  });

  it('basic test', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  describe("computeds", () => {
    it("iconNameClass basic", () => {
      expect(app.computed.iconNameClass.call(wrapper.vm))
        .toBe('x');
    });

    it("classIconFinal", () => {
      expect(app.computed.classIconFinal.call(wrapper.vm))
        .toBe('x  w-4');
    });

    it("classIconFinal with other width and class", () => {
      wrapper.setProps({
        name: "arrow_left",
        classIcon: "bg-red-200",
        widthIcon: "6",
        heightIcon: "6"
      });

      wrapper.vm.buildIcon();

      expect(app.computed.classIconFinal.call(wrapper.vm))
        .toBe('arrow-left bg-red-200 w-6 h-6');
    });
  });

  describe("methods", () => {
    it("buildIcon simple path", () => {
      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.icon.path1)
        .toBe(icons.x);

      expect(wrapper.vm.icosSinDoblePath())
        .toBe(icons.x);
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
        name: "cog"
      });

      wrapper.vm.buildIcon();

      expect(wrapper.vm.$data.doublePath)
        .toBeTruthy();

      expect(wrapper.vm.icosConDoblePath().path1)
        .toBe(icons.cog.path1);

      expect(wrapper.vm.icosConDoblePath().path2)
        .toBe(icons.cog.path2);
    });
  });
});
