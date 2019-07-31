<template>
    <div>
        <div>hellow page</div>
        <Demo></Demo>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
        },
        created(){
            this.fetchDate()
        },
        data () {
            return {

            }
        },

        computed: {

        },
        mounted () {

        },
        watch: {

        },
        methods: {
            async fetchDate(){
                let res = await ly.net.fetchApi({
                    url :"/fb/common/user_info",
                })
                _.each(res.data.data.item,item=>{
                    console.log(item);
                })
                ly.storage.localStorage.save('itemlength', res.data.data.item.length);
                console.log(ly.storage.localStorage.read('itemlength'));
            }
        }
    }
</script>

<style scoped>

</style>
