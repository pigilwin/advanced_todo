<template>
    <ul class="list-group">
        <li class="list-group-item" :data-cy="item.id" :key="item.id" v-for="item in info">{{item.id}} - {{item.value}}</li>
    </ul>
</template>

<script>
  import SystemInformation from '../providers/SystemInformation';

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
        let arr = [];
        const si = new SystemInformation();
        si.getPageName().then((pageName) => {
          arr.push({
            id: 'Name',
            value: pageName
          });
        }).catch(() => {
          arr.push({
            id: 'Name',
            value: 'Failed to find the page name'
          });
        });
        si.getPageStatus().then((status) => {
          arr.push({
            id: 'Status',
            value: status
          });
        }).catch(() => {
          arr.push({
            id: 'Status',
            value: 'Failed to find the page status'
          });
        });
        return arr;
      }
    }
  }
</script>

<style scoped>

</style>