<template>
    <form action="./" method="get" name="frm">
        <dl v-for="form_parts in form_parts_list" :key="form_parts.id">
            <dt>{{form_parts.ttl_label}}</dt>
            <dd>
                <component v-for="form_data in form_parts.form_data_list" :key="form_data.name" :is="form_data.component" :form_data="form_data" :values="values" :errors="errors" @update="update"></component>
            </dd>
        </dl>
        <div class="form-btn_area">
            <p class="btn btn-submit"><a href="#" @click.prevent="onClickSubmit">送信</a></p>
        </div>
    </form>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import FormInputText from '@/components/FormInputText';
    import FormInputNumber from '@/components/FormInputNumber';
    import FormInputDate from '@/components/FormInputDate';
    import FormInputTime from '@/components/FormInputTime';
    import FormInputRadio from '@/components/FormInputRadio';
    import FormInputCheckbox from '@/components/FormInputCheckbox';
    import FormSelect from '@/components/FormSelect';
    import FormTextarea from '@/components/FormTextarea';

    import * as Utils from '@/lib/utils';

    import form_data from '@/const/form_data';
    import formatFormData from '@/lib/formatFormData';

    export default {
        data:function(){
            return {
                unit_groups:[],
                observed_item:{}
            }
        },
        computed:{
            ...mapState('test',['form_parts_list','values','errors']),
            item_by_name(){
                return this.unit_groups.reduce((ret_obj, group) =>{
                    return group.units.reduce((acc,unit) => {
                        unit.items.forEach(item => {
                            acc[item.name] = item;
                        });
                        return acc;
                    },ret_obj);
                },{});
            }
        },
        created:function(){
            // unit_list をセット
            form_data.forEach(data=>{
                let _unit_group = {
                    group_label:data.group_label,
                    units:[]
                };
                data.units.forEach(unit=>{
                    const formated_form_unit_data = formatFormData(unit);
                    formated_form_unit_data && _unit_group.units.push(formated_form_unit_data);
                });
                _unit_group.units.length && this.unit_groups.push(_unit_group);

            });

            // ovserved_item をセット
            this.unit_groups.forEach(group => {
                group.units.forEach(unit => {
                    unit.items.forEach(item => {
                        item.observe !== void 0 && Array.isArray(item.observe) && item.observe.forEach(observe_setting => {
                            console.log(observe_setting);
                            if (!this.observed_item[observe_setting.name]) {
                                this.observed_item[observe_setting.name] = [];
                            }
                            this.observed_item[observe_setting.name].push({
                                _this:item,
                                callback:observe_setting.changeCallback,
                            });
                            // 初期処理が true だったら処理
                            if(observe_setting.init){
                                observe_setting.changeCallback.call(item, this.item_by_name[observe_setting.name]);
                            }

                        });
                    });
                });
            });

        },
        components:{
            FormInputText,
            FormInputNumber,
            FormInputDate,
            FormInputTime,
            FormInputRadio,
            FormInputCheckbox,
            FormSelect,
            FormTextarea
        },
        methods:{
            ...mapActions('test',['setValues']),
            update(update_obj){
                this.setValues(update_obj);
                /*
                if(Array.isArray(this.item_by_name[update_obj.name].value)){
                    // 配列の場合は1回リセットして入れなおす
                    this.item_by_name[update_obj.name].value.splice(0);
                    Array.isArray(update_obj.value) && update_obj.value.forEach(update_value => {
                        this.item_by_name[update_obj.name].value.push(update_value);
                    });

                }else{
                    this.item_by_name[update_obj.name].value = update_obj.value;
                }

                // ovserved_item があれば処理
                this.observed_item[update_obj.name] && this.observed_item[update_obj.name].forEach( observer =>{
                    observer.callback.call(observer._this,update_obj);
                });*/
            },
            // 未入力チェック
            _checkEmpty(item){
                if(item.is_requied){
                    if(Array.isArray(item.value) || item.type==='select'){
                        if(!item.value.length){
                            item.err_msgs.push(item.err_msg_txt.empty_select);
                        }
                    }else if(!item.value){
                        item.err_msgs.push(item.err_msg_txt.empty_input);
                    }
                }
            },
            // min max チェック
            _checkMinMax(item){
                if(!Array.isArray(item.value) && item.value !== '' && item.min !== void 0 && item.max !== void 0){
                    if(item.min !== null && item.value < item.min){
                        let replace_str = item.type === 'date' ? Utils.formatDate(item.min,'YYYY/MM/DD') : item.min;
                        item.err_msgs.push(item.err_msg_txt.min.replace(/__MIN__/g,replace_str));
                    }
                    if(item.max !== null && item.value > item.max){
                        let replace_str = item.type === 'date' ? Utils.formatDate(item.max,'YYYY/MM/DD') : item.max;
                        item.err_msgs.push(item.err_msg_txt.max.replace(/__MAX__/g,replace_str));
                    }
                }
            },
            //minlength maxlength チェック
            _checkMinlengthMaxlength(item){
                if(!Array.isArray(item.value) && item.value !== '' && item.minlength !== void 0 && item.maxlength !== void 0){
                    if(item.minlength !== null && item.value.length < item.minlength){
                        item.err_msgs.push(item.err_msg_txt.minlength.replace(/__MINLENGTH__/g,item.minlength));
                    }
                    if(item.maxlength !== null && item.value.length > item.maxlength){
                        item.err_msgs.push(item.err_msg_txt.maxlength.replace(/__MAXLENGTH__/g,item.maxlength));
                    }
                }
            },
            // pattern チェック
            _checkPattern(item){
                if(!Array.isArray(item.value) && item.value !== '' && item.pattern !== void 0 && item.pattern){
                    let reg = new RegExp(item.pattern);
                    if(!item.value.match(reg)){
                        item.err_msgs.push(item.err_msg_txt.pattern);
                    }
                }

            },
            onClickSubmit(){
                // 入力内容チェック
                let err_flg = this.unit_groups.reduce((group_err_flg, group) => {
                    return group.units.reduce((err_flg, unit) => {
                        return unit.items.reduce((err_flg, item) => {
                            // 初期化
                            item.err_msgs.splice(0);

                            if(!item.disabled){

                                // 未入力チェック
                                this._checkEmpty(item);

                                // min max チェック
                                !item.err_msgs.length && this._checkMinMax(item);

                                // minlength maxlength チェック
                                !item.err_msgs.length && this._checkMinlengthMaxlength(item);

                                // pattern チェック
                                !item.err_msgs.length && this._checkPattern(item);

                            }

                            console.log(item.label,item.err_msgs.length,err_flg);
                            // item.err_msgs.length があればエラーあり
                            return !!item.err_msgs.length || err_flg;
                        }, err_flg) || err_flg;
                    },group_err_flg);
                },false);

                if(!err_flg){
                    // document.frm.submit();
                }

            }
        },
        name: 'Form'
    };
</script>

<style lang="scss">

</style>