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

    // import * as Utils from '@/lib/utils';

    // import formatFormData from '@/lib/formatFormData';

    export default {
        data:function(){
            return {
            }
        },
        computed:{
            ...mapState('params',['form_parts_list','values','errors','is_disp']),
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
            ...mapActions('params',['updateValues','setErrObj']),
            update(update_obj){
                this.updateValues(update_obj);
            },
            onClickSubmit(){
                // 入力内容チェック
                this.setErrObj({});
            }
        },
        name: 'Form'
    };
</script>

<style lang="scss">

</style>