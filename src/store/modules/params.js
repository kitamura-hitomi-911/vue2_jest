import Vue from 'vue'
import base_form_parts_list from '@/const/form_parts_list';

const onValueChanged = base_form_parts_list.reduce( (ret,form_parts) => {
    form_parts.form_data_list.forEach( form_data => {
        if(form_data.onOtherValueChanged !== void 0){
            for(let name in form_data.onOtherValueChanged){
                if(ret[name] === void 0){
                    ret[name] = [];
                }
                ret[name].push({
                    observer_name:form_data.name,
                    fn:form_data.onOtherValueChanged[name]
                });
            }
        }
    });
    return ret;
},{});

const form_parts_list = base_form_parts_list.map(form_parts=>{
    form_parts.form_data_list.forEach( form_data => {
        if(form_data.err_msgs === void 0){
            form_data.err_msgs = {}
        }
        if(form_data.disabled === void 0){
            form_data.disabled = false;
        }
    });
    return form_parts;
});

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

const is_disp = form_parts_list.reduce((ret,form_parts)=>{
    form_parts.form_data_list.forEach( form_data => {
        ret[form_data.name] = form_data.is_disp === void 0 ? form_data.is_disp : true;
    })
    return ret;
},{})


const default_err_msgs = {
    empty:'入力必須です',
    not_select:'選択必須です',
    less_than_min_number:'__MIN__以上の数値を入力してください。',
    over_than_max_number:'__MAX__以上の数値を入力してください',
    before_min_date:'__MIN__以降の日付を入力してください。',
    after_max_date:'__MAX__以前の日付を入力してください。',
    before_min_time:'__MIN__以降の時間を入力してください。',
    after_max_time:'__MAX__以前の時間を入力してください。',
    less_than_minlength:'__MINLENGTH__文字以上入力してください',
    over_than_maxlength:'__MAXLENGTH__文字以下で入力してください',
    unmatch_pattern:'不正なフォーマットです'
}

const state = {
    form_parts_list,
    values,
    errors,
    is_disp,
    onValueChanged
};

const getters = {
    getFormDataList(state){
        return state.form_parts_list.reduce( (ret,form_parts) => {
            form_parts.form_data_list.forEach(form_data => {
                ret.push(form_data);
            })
            return ret;
        },[]);
    },
    getFormPartsByFormName({state},form_name){
        return state.form_parts_list.reduce( (ret, form_parts) => {
            ret = form_parts.form_data_list.some(form_data => form_data.name === form_name) ? form_parts : ret;
            return ret;
        },null)
    },
    getFormDataByName: (state, getters) => (name) => {
        return getters.getFormDataList.reduce( (ret, form_data) => {
            if(form_data.name === name){
                ret = form_data;
            }
            return ret;
        },null);
    },
};

const actions = {
    /**
     * values の更新
     * @param state
     * @param {Object.<string,string|number>} payload
     */
    updateValues({state, commit, dispatch},payload){
        console.log('store:updateValues',payload)
        for(let name in payload){
            if(state.values[name] !== void 0){
                commit('setValue',{name,value:payload[name]});
                dispatch('execFuncOnValueChanged',{name})
            }else{
                commit('setValue',{name,value:payload[name],is_add:true})
            }
        }
    },
    execFuncOnValueChanged({state,getters},{name}){
        console.log(state.onValueChanged[name]);
        if(state.onValueChanged[name]){
            state.onValueChanged[name].forEach( ({observer_name,fn}) => {
                console.log(observer_name,fn);
                const current_value = state.values[observer_name];
                // 受け取り側のfunctionからすると、 この name が監視対象のother value
                const other_value = state.values[name];
                const current_form_data = getters.getFormDataByName(observer_name);
                fn({current_value, other_value, current_form_data});
            })
        }
    },
    /**
     * state.errors に情報をセット
     * @param state
     * @param commit
     * @param {Object.<string,string|number>} tmp_values
     * @param tmp_form_parts_list
     */
    setErrObj({state,commit},{tmp_values, tmp_form_parts_list}){
        const form_parts_list =tmp_form_parts_list || state.form_parts_list;
        const values = tmp_values || state.values;
        commit('resetErrors');
        form_parts_list.reduce( (form_data_list, form_parts) => {
            form_data_list = form_data_list.concat(form_parts.form_data_list);
            return form_data_list;
        } ,[]).forEach(form_data => {
            const tgt_name = form_data.name;
            const tgt_value = values[tgt_name];
            // 未入力チェック
            if(form_data.required && (Array.isArray(tgt_value) && !tgt_value.length || tgt_value === '')){
                if(form_data.component === 'FormInputRadio' || form_data.component === 'FormInputCheckbox' || form_data.component === 'FormSelect'){
                    state.errors[tgt_name].push(form_data.err_msgs.not_select || default_err_msgs.not_select)
                }else{
                    state.errors[tgt_name].push(form_data.err_msgs.empty || default_err_msgs.empty)
                }
            }

            // min・maxチェック
            if(form_data.component==='FormInputNumber' || form_data.component==='FormInputDate' || form_data.component==='FormInputTime'){
                if(form_data.min !== void 0 && tgt_value !== ''){
                    if(tgt_value*1 < form_data.min){
                        state.errors[tgt_name].push(
                            (form_data.err_msgs.less_than_min_number || default_err_msgs.less_than_min_number).replace(/__MIN__/,form_data.min)
                        );
                    }
                }
                if(form_data.max !== void 0 && tgt_value !== ''){
                    if(tgt_value*1 > form_data.min){
                        state.errors[tgt_name].push(
                            (form_data.err_msgs.over_than_max_number || default_err_msgs.over_than_max_number).replace(/__MAX__/,form_data.max)
                        );
                    }
                }
            }

            // minlength,maxlengthチェック
            if( (form_data.component==='FormInputText'||form_data.component==='FormTextarea') && tgt_value !== ''){
                if(form_data.minlength !== void 0 && tgt_value.length < form_data.minlength){
                    state.errors[tgt_name].push(
                        (form_data.err_msgs.less_than_minlength || default_err_msgs.less_than_minlength).replace(/__MINLENGTH__/,form_data.minlength)
                    );
                }
                if(form_data.maxlength !== void 0 && tgt_value.length > form_data.maxlength){
                    state.errors[tgt_name].push(
                        (form_data.err_msgs.over_than_maxlength || default_err_msgs.over_than_maxlength).replace(/__MAXLENGTH__/,form_data.maxlength)
                    );
                }
            }

            // pattern チェック
            if(form_data.pattern !== void 0 && !Array.isArray(tgt_value) && tgt_value !== ''){
                let reg = new RegExp(form_data.pattern);
                if(!reg.test(tgt_value)){
                    state.errors[tgt_name].push(form_data.err_msgs.unmatch_pattern || default_err_msgs.unmatch_pattern)
                }
            }


            console.log(form_data.name, tgt_value)
        });
    }
};

const mutations = {
    setValue(state,{name,value,is_add}){
        console.log('setValue', name,value,is_add);
        if(is_add){
            Vue.set(state.values,name,value);
        }else if(state.values[name] !== void 0){
            if(Array.isArray(state.values[name])){
                state.values[name].splice(0);
                if(Array.isArray(value)){
                    value.forEach(_val => {
                        state.values[name].push(_val);
                    });
                }else{
                    console.log('state.values は配列なのに渡された値が配列ではない？');
                    state.values[name].push(value)
                }
            }else{
                state.values[name] = value
            }
        }

    },
    resetErrors(state){
        for(let name in state.errors){
            state.errors[name].splice(0);
        }

    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}