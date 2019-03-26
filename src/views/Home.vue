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
        <div class="row p-3">
            <div class="col-md-6">
                <div class="p-3">
                    <h1 class="text-center">What needs to be done?</h1>
                </div>
                <ul data-cy="incomplete-list-holder" class="list-group" :key="incomplete.id" v-for="incomplete in incompleteItems">
                    <incomplete-item @completed="completeItem" :priority="incomplete.priority" :id="incomplete.id" :label="incomplete.value"></incomplete-item>
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
                <div v-if="incompleteItems.length > 0" id="incompleteAlert" class="alert alert-info animated fadeInDownBig">
                    Items Left - {{calculateCountOfIncomplete()}}
                </div>
            </div>
            <div class="col-md-6 p-2">
                <div v-if="completeItems.length > 0" id="completeAlert" class="alert alert-success animated fadeInLeftBig">
                    Items Completed - {{calculateCountOfComplete()}}
                </div>
            </div>
        </div>
        <div data-cy="error-message-container" class="row" v-if="!hideError">
            <div class="col-md-12 alert alert-danger">
                {{errorMessage}}
                <span @click="_hideErrorMessage()" class="float-right cursor-pointer" aria-hidden="true">&times;</span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <system-stats></system-stats>
            </div>
        </div>
    </div>
</template>

<script>
  import IncompleteItem from "../components/IncompleteItem";
  import CompleteItem from "../components/CompleteItem";
  import Navbar from "../components/Navbar";
  import SystemStats from "../components/SystemStats";
  import Database from '../providers/Database';
  import StoreHelpers from '../utils/StoreHelpers';
  import { EventBus } from '../utils/EventBus';

  let store = new Database();

  export default {
    name: "home",
    data() {
      return {
        hiddenCompleteItems: [],
        completeItems: [],
        incompleteItems: [],
        showDarkButton: true,
        showLightButton: false,
        hideError: true,
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
      EventBus.$on('settingsWindowOpen', () => {
        this.$router.push('settings');
      });
    },
    methods: {
      _addItemToList(value) {
        let data = {
          value: value,
          id: new Date().getTime(),
          complete: 'N',
          priority: this.priority
        };
        store.addItemToStore(data.id, data);
        this.incompleteItems.push(data);
      },
      _showErrorMessage (message) {
        this.errorMessage = message;
        this.hideError = false;
      },
      _hideErrorMessage () {
        this.errorMessage = '';
        this.hideError = true;
      },
      createIncompleteItem(event) {
        this.hideError = true;
        const value = this.incompleteItemText;
        if (event.which === 13) {
          if (value.length === 0 ) {
            this._showErrorMessage('Value is empty');
            return;
          }
          if (StoreHelpers.fetchAllKeyValues(this.incompleteItems, 'value').indexOf(value) !== -1) {
            this._showErrorMessage('Item already exists in incomplete items');
            return;
          }
          if (StoreHelpers.fetchAllKeyValues(this.completeItems, 'value').indexOf(value) !== -1) {
            this._showErrorMessage('Item already exists in completed items');
            return;
          }
          this._addItemToList(value);
          this.incompleteItemText = '';
        }
      },
      calculateCountOfIncomplete () {
        return Object.keys(this.incompleteItems).length;
      },
      calculateCountOfComplete () {
        return Object.keys(this.completeItems).length;
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
      showHelpBubble () {
        this.helpBubbleShown = true;
      },
      hideHelpBubble () {
        this.helpBubbleShown = false;
      }
    },
    components: {IncompleteItem, CompleteItem, Navbar, SystemStats}
  };
</script>

<style scoped>
    .cursor-pointer{
        cursor: pointer;
    }
</style>