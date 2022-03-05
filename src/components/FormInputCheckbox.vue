<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="form_data.label">{{form_data.label}}</p>
        <div class="form-checkboxes">
            <label :for="form_data.name+'_'+checkbox.value" v-for="checkbox in form_data.list" :key="form_data.name+'_'+checkbox.value">
                <input type="checkbox" :name="form_data.name" v-model="value" :value="checkbox.value" :id="form_data.name+'_'+checkbox.value" :disabled="form_data.disabled || checkbox.disabled"><span></span>{{checkbox.label}}
            </label>
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormInputCheckbox'
    };
</script>

<style>

</style>