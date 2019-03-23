<template>
    <div class="container">
        <div class="row animated heartBeat">
            <div class="col-md-12 p-5">
                <h1 class="display-4 text-center">Advanced Todo</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <navbar
                        @revealAllHiddenItems="revealAllHiddenItems"
                        @hideAllRevealedHiddenItems="hideAllRevealedHiddenItems">

                </navbar>
            </div>
        </div>
        <div class="row" v-if="helpBubbleShown">
            <div class="col-md-12 p-3">
                <div class="alert alert-info">Use the "enter" key to add additional items upon text completion.</div>
            </div>
        </div>
        <div class="row p-3">
            <div class="col-xs-12 col-md-12">
                <input type="text" @focus="showHelpBubble()" v-model="incompleteItemText" @blur="hideHelpBubble()" @keydown="createIncompleteItem" class="form-control add-todo" placeholder="Add todo">
            </div>
        </div>
        <div class="row p-3">
            <div class="col-md-6">
                <div class="p-3">
                    <h1 class="text-center">What needs to be done?</h1>
                </div>
                <ul class="list-group" :key="incomplete.id" v-for="incomplete in incompleteItems">
                    <incomplete-item @completed="completeItem" :priority="incomplete.priority" :id="incomplete.id" :label="incomplete.value"></incomplete-item>
                </ul>
            </div>
            <div class="col-md-6">
                <div class="p-3">
                    <h1 class="text-center">Already Done!</h1>
                </div>
                <ul class="list-group" :key="complete.id" v-for="complete in completeItems">
                    <complete-item
                            @hideItem="hideId"
                            :id="complete.id"
                            :label="complete.value">
                    </complete-item>
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
        <div class="row" v-if="!hideError">
            <div class="col-md-12 alert alert-danger">
                {{errorMessage}}
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
        if (row.complete === 'Y' && row.hidden === 'Y') {
          this.hiddenCompleteItems.push(row);
        } else if (row.complete === 'Y') {
          this.completeItems.push(row);
        } else {
          this.incompleteItems.push(row);
        }
      });
      EventBus.$on('clearDatabase', () => {
        this.hiddenCompleteItems = [];
        this.completeItems = [];
        this.incompleteItems = [];
      });
      EventBus.$on('priority', (priority) => {
        if (priority !== undefined) {
          this.priority = priority;
        }
      });
      window.onerror = () => {
        this._showErrorMessage('Javascript error detected');
      };
    },
    methods: {
      _addItemToList(value) {
        let data = {
          value: value,
          id: new Date().getTime(),
          complete: 'N',
          hidden: 'N',
          priority: this.priority
        };
        store.addItemToStore(data.id, data);
        this.incompleteItems.push(data);
      },
      _showErrorMessage (message) {
        this.errorMessage = message;
        this.hideError = false;
        setTimeout(() => {
          this.errorMessage = '';
          this.hideError = true;
        }, 2000);
      },
      createIncompleteItem(event) {
        this.hideError = true;
        const value = this.incompleteItemText;
        if (event.which === 13) {
          if (value.length === 0 ) {
            this._showErrorMessage('Value is empty');
            return;
          }
          if (this.incompleteItems.indexOf(value) !== -1) {
            this._showErrorMessage('Item already exists in incomplete items');
            return;
          }
          if (this.incompleteItems.indexOf(value) !== -1) {
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
      hideId (id) {
        const that = this;
        let completeItems = [];
        this.completeItems.forEach((item) => {
          if (item.id !== id) {
            completeItems.push(item);
            store.addItemToStore(item.id, item);
          } else {
            item.hidden = 'Y';
            that.hiddenCompleteItems.push(item);
          }
        });
        this.completeItems = completeItems;
      },
      revealAllHiddenItems () {
        const that = this;
        if (this.hiddenCompleteItems.length === 0) {
          this._showErrorMessage('No items to reveal');
          return;
        }
        this.hiddenCompleteItems.forEach((item) => {
          that.completeItems.push(item);
        });
        this.hiddenCompleteItems = [];
      },
      hideAllRevealedHiddenItems () {
        const that = this;
        let completedItems = [];
        this.completeItems.forEach((item) => {
          if (item.hidden === 'Y') {
            that.hiddenCompleteItems.push(item);
          } else {
            completedItems.push(item);
          }
        });
        this.completeItems = completedItems;
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
</style>