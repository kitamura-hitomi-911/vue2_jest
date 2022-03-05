<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="form_data.label">{{form_data.label}}</p>
        <div class="form-select">
            <p class="form-select-label">{{label_selected}}</p>
            <select :name="form_data.name" v-model="value" :disabled="form_data.disabled">
                <option :value="option.value" v-for="option in form_data.list" :key="option.value" :disabled="option.disabled">{{option.label}}</option>
            </select>
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        computed:{
            label_selected(){
                return this.form_data.list.reduce((acc,option)=> {
                    return option.value == this.form_data.value ? option.label : acc;
                },'');
            }
        },
        name: 'FormInputSelect'
    };
</script>

<style>

</style>