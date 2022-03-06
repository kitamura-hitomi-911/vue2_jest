import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import { cloneDeep } from 'lodash'
import _params from '@/store/modules/params';

const localVue = createLocalVue();
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    params:cloneDeep(_params)
  }
})

describe('Form.vue', () => {
  it('ソース出力確認', () => {
    const wrapper = mount(Form, {
      store,
      localVue,
    });
    expect(wrapper).toMatchSnapshot();
  });
})
