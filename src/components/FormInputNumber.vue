<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="form_data.label">{{form_data.label}}</p>
        <div class="form-number">
            <input type="number" :name="form_data.name" v-model="value" :placeholder="form_data.placeholder" :max="form_data.max" :min="form_data.min" :step="form_data.step" :disabled="form_data.disabled">
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormInputNumber'
    };
</script>

<style>

</style>