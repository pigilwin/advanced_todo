<template>
    <li class="list-group-item animated fadeInDownBig">
        <div class="custom-control custom-checkbox">
            <input @click="completeItem(id)" type="checkbox" class="custom-control-input" :id="customCheck + id">
            <label class="custom-control-label" :for="customCheck + id">{{label}}</label>
            <span class="badge badge-secondary custom-badge">{{priorities[priority]}}</span>
        </div>
    </li>
</template>

<script>
  export default {
    name: "IncompleteItem",
    props: {
      label: String,
      id: Number,
      priority: String
    },
    data() {
      return {
        customCheck: "customCheck",
        priorities: {
          "L": "Low",
          "M": "Medium",
          "H": "High"
        }
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
    li .custom-badge {
        float: right;
    }
</style>