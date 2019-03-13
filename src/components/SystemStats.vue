<template>
    <ul class="list-group">
        <li class="list-group-item" :key="item.id" v-for="item in info">{{item.id}} - {{item.value}}</li>
    </ul>
</template>

<script>
  export default {
    name: "SystemStats",
    data () {
      return {
        info: []
      };
    },
    created () {
      this.info = this.buildSystemInformation();
    },
    methods: {
      buildSystemInformation () {
        const keys = ['status', 'name'];
        let arr = [];
        keys.forEach((key) => {
          arr.push({
            id: key,
            value: window[key]
          });
        });
        return arr;
      }
    }
  }
</script>

<style scoped>

</style>