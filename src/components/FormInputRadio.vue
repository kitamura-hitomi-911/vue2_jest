<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-radios">
            <label :for="item.name+'_'+radio.value" v-for="radio in item.list" :key="item.name+'_'+radio.value">
                <input type="radio" :name="item.name" v-model="value" :value="radio.value" :id="item.name+'_'+radio.value" :disabled="item.disabled || radio.disabled"><span></span>{{radio.label}}
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