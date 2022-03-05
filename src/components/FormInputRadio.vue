<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="form_data.label">{{form_data.label}}</p>
        <div class="form-radios">
            <label :for="form_data.name+'_'+radio.value" v-for="radio in form_data.list" :key="form_data.name+'_'+radio.value">
                <input type="radio" :name="form_data.name" v-model="value" :value="radio.value" :id="form_data.name+'_'+radio.value" :disabled="form_data.disabled || radio.disabled"><span></span>{{radio.label}}
            </label>
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormInputRadio'
    };
</script>

<style>

</style>