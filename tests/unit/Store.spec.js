import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
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

describe('Storeテスト', () => {
  it('state.form_parts_list 確認', () => {
    expect(Array.isArray(store.state.params.form_parts_list)).toBeTruthy();
    store.state.params.form_parts_list.forEach(form_parts => {
      expect(form_parts.id).toBeTruthy();
      expect(form_parts.ttl_label !== void 0).toBeTruthy();
      expect(Array.isArray(form_parts.form_data_list)).toBeTruthy();
      form_parts.form_data_list.forEach( form_data => {
        expect(form_data.name).toBeTruthy();
        expect(form_data.component).toBeTruthy();
        const regex = new RegExp('^(FormInputText|FormInputNumber|FormInputDate|FormInputTime|FormInputRadio|FormInputCheckbox|FormSelect|FormTextarea)$');
        expect(regex.test(form_data.component)).toBeTruthy();
      })
    })
  });
  it('state.values 確認', () => {
    store.state.params.form_parts_list.reduce((ret,form_parts) => {
      form_parts.form_data_list.forEach(form_data => {
        ret.push(form_data.name);
      })
      return ret;
    },[]).forEach(form_name => {
      expect(store.state.params.values[form_name] !== void 0).toBeTruthy();
    })
  });
  it('store.dispatch',()=>{
    const form_data_list = store.getters['params/getFormDataList'];
    form_data_list.forEach(form_data => {
      if(Array.isArray(store.state.params.values[form_data.name])){
        store.dispatch('params/updateValues',{
          [form_data.name]:['fuga']
        })
        expect(store.state.params.values[form_data.name]).toEqual(['fuga']);
      }else{
        store.dispatch('params/updateValues',{
          [form_data.name]:'hoge'
        })
        expect(store.state.params.values[form_data.name]).toBe('hoge');
      }

    })

  })

})
