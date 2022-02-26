export default {
    props:{
        item:{
            type:Object,
            required:true
        }
    },
    computed:{
        value:{
            get(){
                return this.item.value;
            },
            set(val){
                this.$emit('update',{
                    name:this.item.name,
                    value:val
                });
            }
        },
        err_msg(){
            return this.item.err_msgs.join('<br>');
        }
    }
};