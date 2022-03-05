export default {
    props:{
        form_data:{
            type:Object,
            required:true
        },
        values:{
            type:Object,
            required:true
        },
        errors:{
            type:Object,
            required:true
        },
        item:{
            type:Object,
        }
    },
    computed:{
        value:{
            get(){
                return this.values[this.form_data.name];
            },
            set(val){
                this.$emit('update',{
                    [this.form_data.name]:val
                });
            }
        },
        err_msg(){
            return this.errors[this.form_data.name].join('<br>');
        }
    }
};