<template>
  <div class="row">
      <div class="col s6 offset-s3">
          <h1>Create Task</h1>
          <form @submit.prevent="submitHandler">
              <div class="input-field">
                  <input id="title" v-model="title" type="text" class="validate" required>
                  <label for="title">Task Name</label>
                  <span class="helper-text" data-error="Task name is required"></span>
              </div>

              <div id="tagField" class="chips" ref="chips"></div>

              <div class="input-field">
                  <textarea id="task-text" v-model="taskText" class="materialize-textarea"></textarea>
                  <label for="task-text">Textarea</label>
                  <span class="character-counter" style="float: right; font-size: 12px;">{{taskText.length}}/2048</span>
              </div>

              <input type="text" ref="datepicker">

              <button class="btn" type="submit">Create task</button>
          </form>
      </div>
  </div>
</template>

<script>

export default {
    name: 'create',

    data: () => ({
        taskText: '',
        title: '',
        chips: null,
        date: null
    }),

    mounted() {
        this.chips = M.Chips.init(this.$refs.chips, {
            placeholder: 'Type a task tag and press "Enter"',
            //secondaryPlaceholder: 'Press Enter'
        });
        this.date = M.Datepicker.init(this.$refs.datepicker, {
            format: 'dd mmmm yyyy',
            defaultDate: new Date(),
            setDefaultDate: true
        });
    },

    methods: {
        submitHandler(){
            const task = {
                title: this.title,
                description: this.taskText,
                id: Date.now(),
                status: 'active',
                tags: this.chips.chipsData,
                date: this.date.date
            };

            this.$store.dispatch('createTask', task);
            this.$router.push('/list');

            console.log(task)
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
    #tagField .input{
        width: 300px !important;
    }
</style>