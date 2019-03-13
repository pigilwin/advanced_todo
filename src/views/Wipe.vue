<template>
    <div></div>
</template>
<script>
import Database from '../providers/Database';

let store = new Database();

export default {
    name: "Wipe",
    created () {
      store.clear();
      this.$router.push('/');
    }
}
</script>