<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-text">
            <input type="text" :name="item.name" v-model="value" :placeholder="item.placeholder" :maxlength="item.maxlength" :minlength="item.minlength" :disabled="item.disabled">
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
    </div>
</template>

<script>
    import FormItemMixin from '@/components/FormItemMixin';

    export default {
        mixins:[FormItemMixin],
        name: 'FormInputText'
    };
</script>

<style>

</style>