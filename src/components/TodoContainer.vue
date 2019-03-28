<template>
    <div class="row p-3">
        <div class="col-md-6">
            <div class="p-3">
                <h1 class="text-center">What needs to be done?</h1>
            </div>
            <ul data-cy="incomplete-list-holder" class="list-group" :key="incomplete.id" v-for="incomplete in incompleteItems">
                <incomplete-item @completed="completeItem(incomplete.id)" :priority="incomplete.priority" :id="incomplete.id" :label="incomplete.value"></incomplete-item>
            </ul>
        </div>
        <div class="col-md-6">
            <div class="p-3">
                <h1 class="text-center">Already Done!</h1>
            </div>
            <ul data-cy="complete-list-holder" class="list-group" :key="complete.id" v-for="complete in completeItems">
                <complete-item :label="complete.value"></complete-item>
            </ul>
        </div>
        <div class="col-md-6 p-2">
            <div v-if="incompleteItems.length > 0" class="alert alert-info animated fadeInDownBig">
                Items Left - {{incompleteItems.length}}
            </div>
        </div>
        <div class="col-md-6 p-2">
            <div v-if="completeItems.length > 0" class="alert alert-success animated fadeInLeftBig">
                Items Completed - {{completeItems.length}}
            </div>
        </div>
    </div>
</template>

<script>
  import IncompleteItem from "../components/IncompleteItem";
  import CompleteItem from "../components/CompleteItem";

  export default {
    name: "TodoContainer",
    props: {
      complete: Array,
      incomplete: Array
    },
    created () {
      this.incompleteItems = this.incomplete;
      this.completeItems = this.complete;
    },
    methods: {
      completeItem (id) {
        this.$emit('justCompleted', id);
      }
    },
    watch: {
      complete: function (newValue) {
        this.completeItems = newValue;
      },
      incomplete: function (newValue) {
        this.incompleteItems = newValue;
      }
    },
    data () {
      return {
        incompleteItems: [],
        completeItems: []
      };
    },
    components: {IncompleteItem, CompleteItem}
  }
</script>

<style scoped>

</style>