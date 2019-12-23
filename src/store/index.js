import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated'
      }
      return task
    })
  },
  mutations: {
    createTask(state, task){
      state.tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, desc, date}){
      const tasks = state.tasks.concat()

      const indexOfTask = tasks.findIndex(task => task.id === id)
      const task = tasks[indexOfTask]

      const status = new Date(date) > new Date() ? 'active' : 'outdated'

      tasks[indexOfTask] = {...task, date: date, description: desc, status}

      //debugger

      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    markAsDone(state, id){
      const indexOfTask = state.tasks.findIndex(task => task.id === id);
      state.tasks[indexOfTask].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({commit}, task){
      commit('createTask', task)
    },
    updateTask({commit}, task){
      commit('updateTask', task)
    },
    markAsDone({commit}, id)
    {
      commit('markAsDone', id)
    }
  },
  getters: {
    tasks: state => state.tasks,
    taskById: state => id => state.tasks.find(task => task.id === id)
  },
  modules: {
  }
})
