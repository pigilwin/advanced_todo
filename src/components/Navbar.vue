<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Utilities Navbar</a>
        <div class="collapse navbar-collapse">
            <div class="my-2 my-lg-0 m-1">
                <select class="form-control" @change="setPriority" v-model="priority">
                    <option :value="priority.id" v-for="priority in priorities" :key="priority.id">{{priority.name}}</option>
                </select>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheLightButton">
                <button @click="changeToLightView" class="btn btn-block btn-lg btn-info">Light Mode</button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheDarkButton">
                <button @click="changeToDarkView" class="btn btn-block btn-lg btn-info">Dark Mode</button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheRevealAllHiddenItemsButton">
                <button @click="revealAllHiddenItems" class="btn btn-block btn-lg btn-info">Show all hidden items</button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheHideAllHiddenItemsButton">
                <button @click="hideAllRevealedHiddenItems" class="btn btn-block btn-lg btn-info">Hide all revealed hidden items</button>
            </div>
            <div class="my-2 my-lg-0 m-1">
                <button @click="clearData" class="btn btn-block btn-lg btn-danger">Wipe data</button>
            </div>
        </div>
    </nav>
</template>

<script>
  import Database from '../providers/Database';
  import { EventBus } from '../utils/EventBus';

  export default {
    name: "navbar",
    data () {
      return {
        shouldWeShowTheLightButton: false,
        shouldWeShowTheDarkButton: true,
        shouldWeShowTheRevealAllHiddenItemsButton: true,
        shouldWeShowTheHideAllHiddenItemsButton: false,
        priority: 'L',
        priorities: []
      };
    },
    created () {
      const that = this;
      const priorities = {
        'L': 'Low',
        'M': 'Medium',
        'H': 'High'
      };
      Object.keys(priorities).forEach((key) => {
        that.priorities.push({
          id: key,
          name: priorities[key]
        });
      });
    },
    methods: {
      changeToLightView () {
        this.shouldWeShowTheLightButton = false;
        this.shouldWeShowTheDarkButton = true;
        const classObserver = document.body.classList;
        classObserver.remove('dark-mode');
        classObserver.add('light-mode');
      },
      changeToDarkView () {
        this.shouldWeShowTheDarkButton = false;
        this.shouldWeShowTheLightButton = true;
        const classObserver = document.body.classList;
        classObserver.remove('light-mode');
        classObserver.add('dark-mode');
      },
      revealAllHiddenItems () {
        this.shouldWeShowTheHideAllHiddenItemsButton = true;
        this.shouldWeShowTheRevealAllHiddenItemsButton = false;
        this.$emit('revealAllHiddenItems');
      },
      hideAllRevealedHiddenItems () {
        this.shouldWeShowTheHideAllHiddenItemsButton = false;
        this.shouldWeShowTheRevealAllHiddenItemsButton = true;
        this.$emit('hideAllRevealedHiddenItems');
      },
      setPriority () {
        EventBus.$emit('priority', this.priority);
      },
      clearData () {
        (new Database()).clear();
        EventBus.$emit('clearDatabase');
      }
    }
  }
</script>