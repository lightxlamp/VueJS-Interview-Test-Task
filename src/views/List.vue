<template>
    <div>
        <h1>List</h1>

        <div class="row">
            <div class="col s4 offset-s8">
                <select ref="select" v-model="filter">
                    <option value="" disabled selected>{{textInsideFilterBox}}</option>
                    <option value="active">Active</option>
                    <option value="outdated">Outdated</option>
                    <option value="completed">Completed</option>
                </select>
                <label>Status filter</label>
                <div class="row">
                    <div class="col s8 offset-s5">
                        <button
                            v-if="filter"
                            @click="filter = null"
                            class="btn btn-small orange darken-2"
                        >
                            Clear filter
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <table v-if="tasks.length">
            <thead>
                <tr>
                   <th>#</th>
                   <th>Title</th>
                   <th>Date</th>
                   <th>Description</th>
                   <th>Status</th>
                   <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(task, index) of filteredTasks"
                    :key="task.id"
                >
                    <td>{{index + 1}}</td>
                    <td>{{task.title}}</td>
                    <td>{{new Date(task.date).toDateString()}}</td>
                    <td class="descriptionTD"><div class="description">{{task.description}}</div></td>
                    <td>{{task.status}}</td>
                    <td>
                        <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
                            Open
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No tasks</p>
    </div>
</template>

<script>
    export default {
        data: () => ({
            filter: null,
            textInsideFilterBox: 'Filter tasks by status'
        }),

        computed: {
            tasks() {
                return this.$store.getters.tasks
            },
            filteredTasks(){
                return this.tasks.filter(task => {
                    if(!this.filter){
                        return true
                    }
                    return task.status === this.filter;
                })
            }
        },
        mounted(){
            M.FormSelect.init(this.$refs.select);
        }
    }
</script>

<style scoped>
    .description{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .descriptionTD{
        max-width: 400px;
    }
</style>