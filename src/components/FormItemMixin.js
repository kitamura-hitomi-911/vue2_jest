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
                    name:this.form_data.name,
                    value:val
                });
            }
        },
        err_msg(){
            return '';
            //return this.item.err_msgs.join('<br>');
        }
    }
};