import React from "react"
import '../style.css'

class AddTodo extends React.Component {
	render() {
		const {
			addTodo,
			handleChange,
			newInput,
			newDate,
			updateTodo,
			index
		} = this.props
		console.log(newInput.length)
		return (
			<div className="d-flex mb-4" id="input">
				<input
					type="text"
					className="form-control mr-5"
					placeholder="Add A New Task"
					value={newInput}
					name="task"
					onChange={handleChange}
				/>
				<input
					type="date"
					className="form-control mr-5"
					placeholder=""
					value={newDate}
					name="date"
					onChange={handleChange}
				/>

				{this.props.editingMode ? (
					<button
						className="btn btn-primary"
						onClick={() => addTodo()}
					>
						Add
					</button>
				) : (
					<button
						className="btn btn-info"
						onClick={() => updateTodo(index)}
					>
						Update
					</button>
				)}
			</div>
		)
	}
}

export default AddTodo
