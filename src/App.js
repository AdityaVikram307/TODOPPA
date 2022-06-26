import React from "react"
import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			newInput: "",
			newDate: "",
			editingMode: false,
			editingIndex: null,
			filter: "all",
			todos: [
				{ id: 1, name: "Walk The Dog", date: "27-06-2022", completed: false },
				{ id: 2, name: "Water The Plants", date: "26-06-2022", completed: false },
				{ id: 3, name: "Visit Mom", date: "01-06-2022", completed: true },
				{ id: 4, name: "Plan A BirthDay", date: "12-06-2022", completed: true },
				{ id: 5, name: "Pay The House Bills", date: "25-07-2022", completed: false }				
			],
			notification: null
		}
	}

	handleChange = e => {
		this.setState({
			newInput: e.target.value,
			newDate: e.target.value
		})
	}

	generateID = () => {
		const ifTodo = this.state.todos.length
		if (!ifTodo) {
			return 1
		} else {
			const newID =
				this.state.todos[this.state.todos.length - 1].id + 1 
			return newID
		}
	}

	addTodo = () => {
		const actualTodos = [...this.state.todos]
		const newTodo = {
			id: this.generateID(),
			name: this.state.newInput,
			date: this.state.newDate,
			completed: false
		}
		const finalTodos = [...actualTodos, newTodo] 

		this.setState({
			todos: finalTodos,
			newInput: "",
			newDate: ""
		})
		this.alert("Task added sucessfully")
	}

	editTodo = index => {
		const newEditingMode = !this.state.editingMode
		this.setState({
			editingMode: newEditingMode,
			newInput: this.state.todos[index].name,
			newDate: this.state.todos[index].date,
			editingIndex: index
		})
	}

	updateTodo = () => {
		const todos = [...this.state.todos]
		const editingTodo = todos[this.state.editingIndex]
		editingTodo.name = this.state.newInput
		editingTodo.date = this.state.newDate
		this.setState({
			todos: todos,
			editingMode: null,
			newInput: "",
			newDate: ""
		})
		this.alert("Task updated sucessfully")
	}

	deleteTodo = index => {
		const todoIdToDelete = this.state.todos[index].id
		const actualTodos = this.state.todos
		const finalTodos = actualTodos.filter(
			todo => todo.id !== todoIdToDelete
		)

		this.setState({
			todos: finalTodos
		})

		this.alert("Task deleted sucessfully")
	}

	alert = notification => {
		this.setState({
			notification
		})

		setTimeout(() => {
			this.setState({
				notification: null
			})
		}, 1300)
	}

	todoCompleted = (e, index) => {
		const todos = [...this.state.todos]
		todos[index].completed = e.target.checked
		console.log(todos)
		this.setState({
			todos
		})
	}

	setFilter = filter => {
		this.setState({
			filter: filter
		})
	}

	clearHandler = () => {
		this.setState({
			todos: []
		})
	}

	render() {

		return (
			<div className="container p-3">
				<div className="jumbotron p-2" id="header1">
					<h1 className="display-4 text-center">To Do Web App Using ReactJs</h1>
				</div>

				{this.state.notification && (
					<div className="alert alert-success">
						<p className="text-center my-auto">
							{this.state.notification}
						</p>
					</div>
				)}

				<AddTodo
					addTodo={this.addTodo}
					handleChange={this.handleChange}
					newInput={this.state.newInput}
					newDate={this.state.newDate}
					editingMode={!this.state.editingMode}
					updateTodo={this.updateTodo}
				/>

				{!this.state.editingMode && (
					<TodoList
						todos={this.state.todos}
						deleteTodo={this.deleteTodo}
						editTodo={this.editTodo}
						todoCompleted={this.todoCompleted}
						setFilter={this.setFilter}
						currentFilter={this.state.filter}
						clearAll={this.clearHandler}
					/>
				)}
				<br />
			</div>
		)
	}
}

export default App
