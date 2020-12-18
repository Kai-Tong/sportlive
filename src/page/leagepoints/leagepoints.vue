<template>
    <div id="leagepoints" class="cl">
        <home_herder @changetype="parentEvent" :headerKey='headerKey'></home_herder>
        <leagemenu  @changetype="gotmenutype"/>
        <pointlist></pointlist>
    </div>
</template>

<script>
const home_herder = () => import("../../components/home/home_herder");
const leagemenu = () => import("../../components/leage/leagemenu");
const pointlist = () => import("../../components/leage/pointlist");
export default {
    name:"leagepoints",
    components: {
        home_herder,
        leagemenu,
        pointlist
    },
    data(){
        return{
            headerKey:'1'
        }
    },
    methods: {
        parentEvent(data) {
        this.menu_num = data;
        },
        gotmenutype(type){
            console.log(type);
        }   
    },
    watch: {
        // menu_num(newValue, oldValue) {
        //     switch (newValue) {
        //         case "1":
        //         return (this.component_name = "home_content");
        //         break;
        //         case "2":
        //         return (this.component_name = "live");
        //         break;
        //         case "3":
        //         //   return (this.component_name = "live");
        //         break;
        //         case "4":
        //         console.log("这个是4");
        //         break;
        //     }
        // },
    },
}
</script>

<style>

</style>