<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Utilities Navbar</a>
        <div class="collapse navbar-collapse">
            <div class="my-2 my-lg-0 m-1">
                <select data-cy="priority" class="form-control" @change="setPriority" v-model="priority">
                    <option :value="priority.id" v-for="priority in priorities" :key="priority.id">{{priority.name}}
                    </option>
                </select>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheLightButton">
                <button data-cy="light-button" @click="changeToLightView" class="btn btn-block btn-lg btn-info">Light
                    Mode
                </button>
            </div>
            <div class="my-2 my-lg-0 m-1" v-if="shouldWeShowTheDarkButton">
                <button data-cy="dark-button" @click="changeToDarkView" class="btn btn-block btn-lg btn-info">Dark
                    Mode
                </button>
            </div>
            <div class="my-2 my-lg-2 m-1">
                <button data-cy="static-button" @click="goToStatic" class="btn btn-block btn-lg btn-primary">Go to Static</button>
            </div>
            <div class="my-2 my-lg-2 m-1">
                <button data-cy="prompt-for-stub" @click="showPrompt" class="btn btn-block btn-lg btn-secondary">Show
                    Prompt
                </button>
            </div>
            <div class="my-2 my-lg-0 m-1">
                <button data-cy="wipe-data" @click="clearData" class="btn btn-block btn-lg btn-danger">Wipe data
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
    import Database from '../providers/Database';
    import {EventBus} from '../utils/EventBus';

    export default {
        name: "navbar",
        data() {
            return {
                shouldWeShowTheLightButton: false,
                shouldWeShowTheDarkButton: true,
                priority: 'L',
                priorities: []
            };
        },
        created() {
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
            changeToLightView() {
                this.shouldWeShowTheLightButton = false;
                this.shouldWeShowTheDarkButton = true;
                const classObserver = document.body.classList;
                classObserver.remove('dark-mode');
                classObserver.add('light-mode');
            },
            changeToDarkView() {
                this.shouldWeShowTheDarkButton = false;
                this.shouldWeShowTheLightButton = true;
                const classObserver = document.body.classList;
                classObserver.remove('light-mode');
                classObserver.add('dark-mode');
            },
            setPriority() {
                EventBus.$emit('priority', this.priority);
            },
            clearData() {
                (new Database()).clear();
                EventBus.$emit('clearDatabase');
            },
            showPrompt () {
                let name = window.prompt('What is your name?');
                window.alert('Hello ' + name);
            },
            goToStatic () {
                this.$router.push('/static');
            }
        }
    }
</script>