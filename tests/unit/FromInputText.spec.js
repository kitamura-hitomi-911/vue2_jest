// import { shallowMount, mount } from '@vue/test-utils'
import { createLocalVue, mount } from '@vue/test-utils'
import FormInputText from '@/components/FormInputText.vue'
import form_data from '@/const/form_data'

const localVue = createLocalVue();
const tgt_props = form_data.reduce((ret, _form_data)=>{
  _form_data.units.forEach(unit => {
    unit.items.forEach(item=>{
      if(item.type === 'text'){
        item.err_msgs = [];
        ret.push({item});
      }
    })
  })
  return ret;
},[]);

describe('FormInputText.vue', () => {
  it('props の反映確認', () => {
    tgt_props.forEach(tgt_prop=>{
      const wrapper = mount(FormInputText, {
        localVue,
        propsData: tgt_prop
      })
      expect(wrapper).toMatchSnapshot();
      // console.log(wrapper.text())
      const input = wrapper.find('input');
      expect(input.attributes().name).toBe(tgt_prop.item.name);
      expect(input.attributes().type).toBe(tgt_prop.item.type);
      if(tgt_prop.item.value !== void 0 && tgt_prop.item.value){
        expect(input.element.value).toBe(tgt_prop.item.value);
      }
      if(tgt_prop.item.placeholder !== void 0){
        expect(input.attributes().placeholder).toBe(tgt_prop.item.placeholder);
      }
      if(tgt_prop.item.minlength !== void 0){
        expect(input.attributes().minlength).toBe(tgt_prop.item.minlength+'');
      }
      if(tgt_prop.item.maxlength !== void 0){
        expect(input.attributes().maxlength).toBe(tgt_prop.item.maxlength+'');
      }
      // expect(wrapper.vm).toBeTruthy()
      // expect(wrapper.text()).toMatch('hoge')
    })
  })

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
