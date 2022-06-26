import React from "react"
import TodoItem from "./TodoItem"
import Filter from "./Filter"
import Search from "./Search"
import ClearTodos from "./ClearTodos"

class TodoList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			searchQuery: ""
		}
	}

	updateSearchQuery = e => {
		this.setState({
			searchQuery: e.target.value
		})
	}

	render() {
		const {
			todos,
			deleteTodo,
			editTodo,
			todoCompleted,
			setFilter,
			currentFilter,
			clearAll
		} = this.props

		const todosToShow = todos.filter(todo => {
			if (currentFilter === "all") {
				return true
			} else if (currentFilter === "pending") {
				return !todo.completed
			} else {
				return todo.completed
			}
		})

		let searchingTodos = todosToShow.filter(todo => {
			return (
				todo.name
					.toLocaleLowerCase()
					.indexOf(this.state.searchQuery.toLocaleLowerCase()) !== -1
			)
		})

		return (
			<div className="card">
				<div className="card-header d-flex flex-row align-items-center" id="header">

					<span
						style={{ fontSize: "20px", fontWeight: "bold" }}
						className="flex-fill mr-5"
					>
						Tasks List
					</span>

					<Search searchTodo={this.updateSearchQuery} />

					<Filter
						setFilter={setFilter}
						currentFilter={currentFilter}
					/>

					<ClearTodos clearAll={clearAll} />
				</div>

				<div className="card-body">
					<ul className="list-group">
						{searchingTodos.map((todo, index) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								deleteTodo={() => deleteTodo(index)}
								editTodo={() => editTodo(index)}
								todoCompleted={e => todoCompleted(e, index)}
							/>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export default TodoList
