// import { shallowMount, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import FormInputText from '@/components/FormInputText.vue'
import store from '@/store'

const localVue = createLocalVue();
localVue.use(Vuex)

describe('FormInputText.vue', () => {
  // このコンポーネントが呼ばれる form_data のリストを作成
  const propsDataList = store.getters['params/getFormDataList'].filter(form_data => {
    return form_data.component === 'FormInputText';
  }).map( form_data => {
    return {
      form_data,
      values:store.state.params.values,
      errors:store.state.params.errors
    }
  });

  const propsData = {
    form_data:{
      name:'hoge1',
      label:'1行テキスト',
      component:'FormInputText',
      placeholder: '入力してください',
      minlength: 2,
      maxlength: 8,
      required: true
    },
    values:store.state.params.values,
    errors:store.state.params.errors
  };
  it('props の反映確認', () => {
    propsDataList.forEach(async (propsData) => {
      const wrapper = mount(FormInputText, {
        localVue,
        propsData
      });
      expect(wrapper).toMatchSnapshot();
      const label = wrapper.find('.form-item-ttl');
      // wrapper.findでとった要素のDOM本体は element にある
      expect(label.element.innerHTML).toBe(propsData.form_data.label);
      const input = wrapper.find('input');
      expect(input.attributes().name).toBe(propsData.form_data.name);
      expect(input.attributes().type).toBe('text');
      // undefined や 空文字はそれで一値する
      expect(input.attributes().placeholder).toBe(propsData.form_data.placeholder);
      // v-model の value は element.value で取る
      expect(input.element.value).toBe(propsData.values[propsData.form_data.name]);
      await input.setValue('hoge');
      expect(input.element.value).toBe('hoge');
      await input.setValue(1234);
      expect(input.element.value).toBe('1234');// form からとるときは文字列になっちゃうね。


      /*


      if(tgt_prop.form_data.value !== void 0 && tgt_prop.item.value){
        expect(input.element.value).toBe(tgt_prop.item.value);
      }
      if(tgt_prop.item.placeholder !== void 0){
        expect(input.attributes().placeholder).toBe(tgt_prop.item.placeholder);
      }
      if(tgt_prop.item.minlength !== void 0){
        expect(input.attributes().minlength).toBe(tgt_prop.item.minlength + '');
      }
      if(tgt_prop.item.maxlength !== void 0){
        expect(input.attributes().maxlength).toBe(tgt_prop.item.maxlength + '');
      }*/
      // expect(wrapper.vm).toBeTruthy()
      // expect(wrapper.text()).toMatch('hoge')
    })
  });

  /*
  it('value更新の確認', async () => {
    const wrapper = mount(FormInputText, {
      localVue,
      propsData: tgt_props[0]
    })
    const changedPropsData = tgt_props[0].item.value = 'bar';

    await wrapper.setProps(changedPropsData)
    const input = wrapper.find('input');
    expect(input.element.value).toBe('bar');
  });*/
})
