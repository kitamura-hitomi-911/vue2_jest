import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import store from '@/store'

const localVue = createLocalVue();
localVue.use(Vuex)

describe('Form.vue', () => {
  it('props の反映確認', () => {
    const wrapper = shallowMount(Form, {
      store,
      localVue,
    });
    expect(wrapper).toMatchSnapshot();
  });
})
