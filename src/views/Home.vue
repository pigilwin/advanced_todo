<template>
    <div class="container">
        <div class="row animated heartBeat">
            <div class="col-md-12 p-5">
                <h1 class="display-4 text-center">Advanced Todo</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <navbar></navbar>
            </div>
        </div>
        <div class="row" v-if="helpBubbleShown">
            <div class="col-md-12 p-3">
                <div data-cy="new-item-help-text" class="alert alert-info">Use the "enter" key to add additional items upon text completion.</div>
            </div>
        </div>
        <div class="row p-3">
            <div class="col-xs-12 col-md-12">
                <input data-cy="new-item" type="text" @focus="showHelpBubble()" v-model="incompleteItemText" @blur="hideHelpBubble()" @keydown="createIncompleteItem" class="form-control add-todo" placeholder="Add todo">
            </div>
        </div>
        <todo-container :incomplete="incompleteItems" :complete="completeItems" @justCompleted="completeItem"></todo-container>
        <error-box :message="errorMessage" @errorMessageClosed="errorMessageClosed"></error-box>
        <div class="row">
            <div class="col-md-12">
                <system-stats></system-stats>
            </div>
        </div>
    </div>
</template>

<script>
  import TodoContainer from '../components/TodoContainer';
  import Navbar from "../components/Navbar";
  import SystemStats from "../components/SystemStats";
  import Database from '../providers/Database';
  import StoreHelpers from '../utils/StoreHelpers';
  import ErrorBox from '../components/ErrorBox';
  import { EventBus } from '../utils/EventBus';

  let store = new Database();

  export default {
    name: "home",
    data() {
      return {
        completeItems: [],
        incompleteItems: [],
        errorMessage: '',
        completeItemsProvider: null,
        helpBubbleShown: false,
        incompleteItemText: '',
        priority: 'L'
      };
    },
    created () {
      let data = store.getData();
      Object.keys(data).forEach((key) => {
        let row = data[key];
        if (row.complete === 'Y') {
          this.completeItems.push(row);
        } else {
          this.incompleteItems.push(row);
        }
      });
      EventBus.$on('clearDatabase', () => {
        this.completeItems = [];
        this.incompleteItems = [];
      });
      EventBus.$on('priority', (priority) => {
        if (priority !== undefined) {
          this.priority = priority;
        }
      });
    },
    methods: {
      _addItemToList(value) {
        const data = {
          value: value,
          id: (new Date()).getTime(),
          complete: 'N',
          priority: this.priority
        };
        store.addItemToStore(data.id, data);
        this.incompleteItems.push(data);
      },
      createIncompleteItem(event) {
        const value = this.incompleteItemText;
        if (event.which === 13) {
          if (value.length === 0 ) {
            this.errorMessage = 'Value is empty';
            return;
          }
          if (StoreHelpers.fetchAllKeyValues(this.incompleteItems, 'value').indexOf(value) !== -1) {
            this.errorMessage = 'Item already exists in incomplete items';
            return;
          }
          if (StoreHelpers.fetchAllKeyValues(this.completeItems, 'value').indexOf(value) !== -1) {
            this.errorMessage = 'Item already exists in completed items';
            return;
          }
          this._addItemToList(value);
          this.incompleteItemText = '';
        }
      },
      completeItem (id) {
        const that = this;
        let incompleteItems = [];
        this.incompleteItems.forEach((item) => {
          if (item.id === id){
            item.complete = 'Y';
            that.completeItems.push(item);
            store.addItemToStore(item.id, item);
          } else {
            incompleteItems.push(item);
          }
        });
        this.incompleteItems = incompleteItems;
      },
      errorMessageClosed () {
        this.errorMessage = '';
      },
      showHelpBubble () {
        this.helpBubbleShown = true;
      },
      hideHelpBubble () {
        this.helpBubbleShown = false;
      }
    },
    components: {
      Navbar,
      SystemStats,
      TodoContainer,
      ErrorBox
    }
  };
</script>

<style scoped>
</style>