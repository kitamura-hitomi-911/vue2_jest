<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="form_data.label">{{form_data.label}}</p>
        <div class="form-date">
            <input type="date" :name="form_data.name" v-model="value" :placeholder="form_data.placeholder" :max="form_data.max" :step="form_data.step" :disabled="form_data.disabled">
            <!-- UI上、min が今日より後だと、日付の入力がやりづらいので、input タグの min では指定しない -->
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormInputDate'
    };
</script>

<style>

</style>