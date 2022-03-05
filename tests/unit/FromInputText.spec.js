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
        store,
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
      // wrapper.vm.$emit('foo',123)
      // wrapper.emitted() は次のオブジェクトを返します:
      // {
      //   foo: [[], [123]]
      // }
      // ＃payloadの内容が配列に格納されて配列で格納される
      // オブジェクトの比較は toEqual を使用
      expect(wrapper.emitted().update).toBeTruthy();
      expect(wrapper.emitted().update[0][0]).toEqual({[propsData.form_data.name]:'hoge'})
      await input.setValue(1234);
      // 続けて更新した場合は添え字が1になる
      expect(wrapper.emitted().update[1][0]).toEqual({[propsData.form_data.name]:'1234'})
      // emit後、storeをたたかないので、ここでstoreをたたいてもしょうがない
      // console.log(wrapper.vm.$store.state.params.values[propsData.form_data.name]);
      // expect(store.state.params.values[propsData.form_data.name]).toBe('1234');
    })
  });
})
