<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-select">
            <p class="form-select-label">{{lebel_selected}}</p>
            <select :name="item.name" v-model="value" :disabled="item.disabled">
                <option :value="option.value" v-for="option in item.list" :key="option.value" :disabled="option.disabled">{{option.label}}</option>
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
            lebel_selected(){
                return this.item.list.reduce((acc,option)=> {
                    return option.value == this.item.value ? option.label : acc;
                },'');
            }
        },
        name: 'FormInputSelect'
    };
</script>

<style>

</style>