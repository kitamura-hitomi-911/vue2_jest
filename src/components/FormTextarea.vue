<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="form_data.label">{{form_data.label}}</p>
        <div class="form-textarea">
            <textarea :name="form_data.name" v-model="value" :placeholder="form_data.placeholder" :maxlength="form_data.maxlength" :minlength="form_data.minlength" :disabled="form_data.disabled"></textarea>
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormTextarea'
    };
</script>

<style>

</style>