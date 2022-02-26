<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-checkboxes">
            <label :for="item.name+'_'+checkbox.value" v-for="checkbox in item.list" :key="item.name+'_'+checkbox.value">
                <input type="checkbox" :name="item.name" v-model="value" :value="checkbox.value" :id="item.name+'_'+checkbox.value" :disabled="item.disabled || checkbox.disabled"><span></span>{{checkbox.label}}
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