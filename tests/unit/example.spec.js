import { shallowMount } from '@vue/test-utils';
import app from '@/app.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(app, {
      propsData: {
        name: 'x'
      }
    });

    expect(wrapper.exists())
      .toBeTruthy();
  });
});
