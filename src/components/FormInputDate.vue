<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-date">
            <input type="date" :name="item.name" v-model="value" :placeholder="item.placeholder" :max="item.max" :step="item.step" :disabled="item.disabled">
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