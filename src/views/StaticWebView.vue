<template>
    <div class="container">
        <div class="row animated heartBeat">
            <div class="col-md-12 p-5">
                <h1 class="display-4 text-center">Static Todo</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <navbar></navbar>
            </div>
        </div>
        <todo-container :complete="completeItems" :incomplete="incompleteItems"></todo-container>
    </div>
</template>

<script>
  import Navbar from "../components/Navbar";
  import TodoContainer from "../components/TodoContainer";
  import WebStore from '../providers/WebStore';
  import { EventBus } from '../utils/EventBus';

  export default {
    name: "StaticWebView",
    created () {
      const that = this;
      let timestamp = (new Date()).getTime();
      WebStore.fetchWebContents().then((Response) => {
        Response.json().then((data) => {
          data.forEach((dataRow) => {
            dataRow.id = timestamp;
            timestamp = timestamp + 1;
            if (dataRow.complete === 'Y') {
              that.completeItems.push(dataRow);
            } else {
              that.incompleteItems.push(dataRow);
            }
          });
        });
      });
      EventBus.$on('clearDatabase', () => {
        this.completeItems = [];
        this.incompleteItems = [];
      });
    },
    data () {
      return {
        completeItems: [],
        incompleteItems: [],
        errorShown: false
      };
    },
    components: {
      Navbar,
      TodoContainer
    }
  };
</script>

<style scoped>

</style>