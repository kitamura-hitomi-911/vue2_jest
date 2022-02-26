const unit_props = {
    required:['label','id','items'],
    optional:[]
};
const setting_by_type = {
    text:{
        component_name:'FormInputText',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {placeholder:''},
                {maxlength:null},
                {minlength:null},
                {pattern:null},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        }
    },
    number:{
        component_name:'FormInputNumber',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {max:null},
                {min:null},
                {step:null},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        }
    },
    date:{
        component_name:'FormInputDate',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {max:null},
                {min:null},
                {step:null},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        }
    },
    time:{
        component_name:'FormInputTime',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {max:null},
                {min:null},
                {step:null},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        }
    },
    radio: {
        component_name: 'FormInputRadio',
        item_props:{
            required:['name','type','list','value'],
            optional:[
                {label:''},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        },
        item_list_props:{
            required:['label','value'],
            optional:[
                {disabled:false}
            ]
        }
    },
    checkbox: {
        component_name: 'FormInputCheckbox',
        item_props:{
            required:['name','type','list','value'],
            optional:[
                {label:''},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        },
        item_list_props:{
            required:['label','value'],
            optional:[
                {disabled:false}
            ]
        }
    },
    select: {
        component_name: 'FormSelect',
        item_props:{
            required:['name','type','list','value'],
            optional:[
                {label:''},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        },
        item_list_props:{
            required:['label','value'],
            optional:[
                {disabled:false}
            ]
        }
    },
    textarea: {
        component_name: 'FormTextarea',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {placeholder:''},
                {maxlength:null},
                {minlength:null},
                {disabled:false},
                {is_requied:false},
                {err_msgs:[]}
            ]
        }
    }

};

const default_err_msg_txt = {
    empty_input:'入力必須です',
    empty_select:'選択必須です',
    min:'__MIN__以上の値を指定してください',
    max:'__MAX__以下の値を指定してください',
    minlength:'__MINLENGTH__文字以上入力してください',
    maxlength:'__MAXLENGTH__文字以下で入力してください',
    pattern:'不正なフォーマットです'
};

export default data => {
    // unit の必須プロパティの不足チェック
    if(unit_props.required.some(prop=> data[prop] === void 0)){
        console.error('Missing required property in form data',data);
        return null;
    }
    // unit の任意プロパティのチェック
    unit_props.optional.forEach(prop_default => {
        Object.keys(prop_default).forEach(key => {
            if(data[key] === void 0){
                data[key] = prop_default[key];
            }
        });
    });

    data.items.forEach(item => {
        // item のプロパティチェック
        const _item_props = setting_by_type[item.type].item_props;
        // 必須
        if(_item_props.required.some(prop => item[prop] === void 0)){
            console.error('Missing required property in item data',item);
        }
        // 任意
        _item_props.optional.forEach(prop_default => {
            Object.keys(prop_default).forEach(key => {
                if(item[key] === void 0){
                    item[key] = Array.isArray(prop_default[key])?[]:prop_default[key];
                }
            });
        });

        // item の component_name をセット
        item.component_name = setting_by_type[item.type].component_name;

        // item の err_msg_set をセット
        item.err_msg_txt = Object.assign({}, default_err_msg_txt, item.err_msg_txt || {});

        // item.list のプロパティのチェック
        const _item_list_props = setting_by_type[item.type].item_list_props || '';
        _item_list_props && item.list && item.list.forEach(list_item => {
            // 必須
            if(_item_list_props.required.some(prop => list_item[prop] === void 0)){
                console.error('Missing required property in item.list data',item);
            }
            // 任意
            _item_list_props.optional.forEach(prop_default => {
                Object.keys(prop_default).forEach(key => {
                    if(list_item[key] === void 0){
                        list_item[key] = Array.isArray(prop_default[key])?[]:prop_default[key];
                    }
                });
            });
        });


    });

    // unit 算出するプロパティ追加
    data.is_requied = data.items.some(item => {
        return item.is_requied;
    });

    return data;
};