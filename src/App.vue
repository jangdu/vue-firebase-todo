<template>
  <div class="todo">
    <div class="fs-1 title">Todo</div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Add a todo" v-model="newTodoContent" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" @click="addTodo" id="button-addon2">Button</button>
    </div>
    <div v-for="item in store.state.db" :key="item.id" class="card todo-item text-white bg-dark mb-3 todo-item">
      <div class="card-body">
        <div class='content'>
          <div class="calumns todo-item d-flex">
            <div class="column p-2 flex-grow-1">
              <p class="card-text todo-content">{{item.content}}</p>
            </div>
            <div class="column p-2">
              <button type="button" :class="item.done ? 'btn btn-success':'btn btn-secondary'" @click="checkedTodo(item.id)" style="margin-right: 0.5rem;">&check;</button>
              <button type="button" class="btn btn-danger" @click="delTodo(item.id)">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import
import { onMounted, ref } from 'vue'
import { db } from '@/firebase'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useStore } from 'vuex'

// store states
const store = useStore()

// firebase refs
const todosCollectionRef = collection(db, 'todos')

//  get
onMounted(async () => {
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fireData = []
    const cities = []
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name)
      console.log(doc.id, ' => ', doc.data())
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fireData.push(todo)
    })
    store.state.db = fireData
  })
})

// add todo
const newTodoContent = ref('')

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false
  })
  newTodoContent.value = ''
}

// del todo
const delTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id))
}

// checked todo
const checkedTodo = (id) => {
  const filterDb = store.state.db.filter(item => item.id === id)
  const filterDbIndex = store.state.db.indexOf(filterDb[0])
  updateDoc(doc(todosCollectionRef, id), {
    done: !store.state.db[filterDbIndex].done
  })
}
</script>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
    }
  },
  setup () {},
  created () {},
  mounted () {
  },
  unmounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
.todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.title{
  margin: 1.5rem;
  text-align: center;
}
.todo-list{
  width: 100%;
}
.todo-content{
  font-size: 18px;
  padding-top: 5px;
}
.done{
  background-color: chartreuse;
}
</style>
