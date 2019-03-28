<template>
    <li class="list-group-item d-flex justify-content-between align-items-center animated fadeInLeftBig">{{label}}
    </li>
</template>

<script>
  export default {
    name: "CompleteItem",
    props: {
      label: String,
      id: Number
    }
  }
</script>

<style scoped>
    .deleteTrigger{
        cursor: pointer;
    }
</style>