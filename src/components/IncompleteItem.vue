<template>
    <li class="list-group-item animated fadeInDownBig">
        <div class="custom-control custom-checkbox">
            <input @click="completeItem(id)" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">{{label}}</label>
        </div>
    </li>
</template>

<script>
  export default {
    name: "IncompleteItem",
    props: {
      label: String,
      id: Number
    },
    data() {
      return {

      };
    },
    methods: {
      completeItem (id) {
        this.$emit('completed', id);
      }
    }
  }
</script>

<style scoped>
    li {
        margin-top: 2.5px;
        margin-bottom: 2.5px;
    }
    li div.checkbox {

    }
</style>