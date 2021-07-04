import React, { useState } from 'react'
import TodoList from './components/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'

import './styles/Todo.css'

const filterByStatus = (listTodos = [], status = '', id) => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter((item) => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter((item) => item.isCompleted)
    case 'REMOVE':
      return listTodos.filter((item) => item.id !== id)
    default:
      return listTodos
  }
}

const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter((item) => !item.isCompleted)
}

const App = () => {
  const [listTodos, setListTodos] = useState([])
  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const [status, setStatus] = useState('All')
  const [todoEditingId, setTodoEditingId] = useState('')

  const addTodos = (todo = {}) => {
    const data = [...listTodos, todo]
    setListTodos(data)
  }

  const markCompleted = (id = '') => {
    let isCheckedAll = true
    const updatedListTodos = listTodos.map((item) => {
      if (
        (!item.isCompleted && item.id !== id) ||
        (item.isCompleted && item.id === id)
      ) {
        isCheckedAll = false
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    setIsCheckedAll(isCheckedAll)
    setListTodos(updatedListTodos)
  }

  const checkAll = () => {
    const updatedListTodos = listTodos.map((item) => ({
      ...item,
      isCompleted: !isCheckedAll
    }))
    setIsCheckedAll(!isCheckedAll)
    setListTodos(updatedListTodos)
  }

  const clearCompleted = () => {
    const data = filterTodosLeft(listTodos)
    setListTodos(data)
  }

  const getEditTodo = (id = '') => {
    setTodoEditingId(id)
  }

  const editTodo = (todo, index) => {
    const data = listTodos.splice(index, 1, todo)
    setListTodos(data)
  }

  const removeTodo = (id = '') => {
    const data = filterByStatus(listTodos, 'REMOVE', id)
    setListTodos(data)
  }

  const setStatusFilter = (status) => {
    setStatus(status)
  }

  return (
    <div className="todoapp">
      <Header addTodos={addTodos} />
      <TodoList
        listTodos={filterByStatus(listTodos, status)}
        markCompleted={markCompleted}
        checkAll={checkAll}
        isCheckedAll={isCheckedAll}
        todoEditingId={todoEditingId}
        getEditTodo={getEditTodo}
        editTodo={editTodo}
        removeTodo={removeTodo}
      />
      <Footer
        activeButton={status}
        setStatusFilter={setStatusFilter}
        clearCompleted={clearCompleted}
        numOfTodosLeft={filterTodosLeft(listTodos).length}
        numOfTodos={listTodos.length}
      />
    </div>
  )
}

export default App
