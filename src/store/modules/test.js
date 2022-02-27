import Vue from 'vue'
import form_parts_list from '@/const/form_parts_list';

const values = form_parts_list.reduce((ret,form_parts)=>{
    form_parts.form_data_list.forEach( form_data => {
        ret[form_data.name] = form_data.default_value
            ? form_data.default_value
            : form_data.component === 'FormInputCheckbox'
                ? []
                : '';
    })
    return ret;
},{})

const errors = form_parts_list.reduce((ret,form_parts)=>{
    form_parts.form_data_list.forEach( form_data => {
        ret[form_data.name] = [];
    })
    return ret;
},{})

const state = {
    form_parts_list,
    values,
    errors
};

const getters = {

};

const actions = {
    setValues({state},payload){
        for(let name in payload){
            if(state[name] !== void 0){
                if(Array.isArray(state[name])){
                    state[name].splice(0);
                    if(Array.isArray(payload[name])){
                        payload[name].forEach(_val => {
                            state[name].push(_val);
                        });
                    }else{
                        console.log('state.values は配列なのに渡された値が配列ではない？');
                        state[name].push(payload[name])
                    }
                }else{
                    state[name] = payload[name]
                }

            }else{
                Vue.set(state,name,payload[name]);
            }
        }
    }
};

const mutations = {

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}