<template>
  <div class="modalBox" :class="opts.vertical">
    <div class="modalBox__msg" v-html="opts.msg"></div>
    <div class="modalBox__btns">
      <a class="modalBox__btn" v-for="(item, index) in opts.btns" @click="callback({evName: item.event, name: opts.name})" href="javascript:;">{{item.name}}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalBox',
  props:[
    'opts'
  ],
  data () {
    return {
      btn: ''
    }
  },
  methods:{
     callback(ops){
        this.$emit("callback", ops) 
     }
  }
}
</script>

<style scoped>
.highlight{
  color: #f80;
  font-style: normal;
}
</style>
