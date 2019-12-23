<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">
            <h1>{{task.title}}</h1>

            <form @submit.prevent="submitHandler">

                <div id="tagField" class="chips" ref="chips"></div>

                <div class="input-field">
                    <textarea :disabled="isStatusCompleted" id="task-text" v-model="taskText"
                              class="materialize-textarea"></textarea>
                    <label for="task-text">Textarea</label>
                    <span class="character-counter" style="float: right; font-size: 12px;">
                        {{taskText.length}}/2048
                    </span>
                </div>

                <input type="text" ref="datepicker" :disabled="isStatusCompleted">

                <button id="updateBtn" class="btn" type="submit" :disabled="isStatusCompleted">Update task</button>
                <button class="btn blue" type="submit" @click="markAsDone" :disabled="isStatusCompleted">
                    Mark as done
                </button>

            </form>

        </div>
        <p v-else>Task not found</p>
    </div>
</template>

<script>
    export default {
        computed: {
            task() {
                return this.$store.getters.taskById(+this.$route.params.id)
            },
            isStatusCompleted(){
                return this.task.status == 'completed'
            }
        },

        data: () => ({
            taskText: '',
            chips: null,
            date: null
        }),

        mounted() {
            this.taskText = this.task.description,
            this.chips = M.Chips.init(this.$refs.chips, {
                placeholder: 'Type a task tag and press "Enter"',
                data: this.task.tags,
                //secondaryPlaceholder: 'Press Enter'
            });
            this.date = M.Datepicker.init(this.$refs.datepicker, {
                format: 'dd mmmm yyyy',
                defaultDate: new Date(this.task.date),
                setDefaultDate: true
            });

            setTimeout(() => { // fixes issue with placeholders and prepopulated inputs. Add to ad-project
                M.updateTextFields()
            }, 0);
        },

        methods: {
            submitHandler(){
                //debugger
                this.$store.dispatch('updateTask', {
                    id: this.task.id,
                    desc: this.taskText,
                    date: this.date.date
                });
                this.$router.push('/list');
            },
            markAsDone(){
                this.$store.dispatch('markAsDone', this.task.id)
                this.$router.push('/list');
            }
        },

        destroyed() //to prevent memory leak
        {
            if(this.date && this.date.destroy) // this.date.destroy - provided by MaterializeCSS
            {
                this.date.destroy()
            }

            if(this.chips && this.chips.destroy) // If this variable initialized and has "destroy" method => destroy it
            {
                this.chips.destroy()
            }
        }
    }
</script>

<style scoped>
    textarea{
        min-height: 150px;
    }
    #updateBtn{
        margin-right: 1rem;
    }
</style>