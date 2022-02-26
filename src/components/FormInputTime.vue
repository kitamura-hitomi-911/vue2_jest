<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-time">
            <input type="time" :name="item.name" v-model="value" :placeholder="item.placeholder" :max="item.max" :min="item.min" :step="item.step" :disabled="item.disabled">
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormInputTime'
    };
</script>

<style>

</style>