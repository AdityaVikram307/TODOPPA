import React from "react"

const Filter = ({ setFilter, currentFilter }) => {
	return (
		<>
			<button
				className="btn-sm btn-info mr-2"
				onClick={() => {
					setFilter("all")
				}}
			>
				All
			</button>
			<button
				className="btn-sm btn-warning mr-2"
				onClick={() => {
					setFilter("pending")
				}}
			>
				Pending
			</button>
			<button
				className="btn-sm btn-success mr-4"
				onClick={() => {
					setFilter("done")
				}}
			>
				Done
			</button>
		</>
	)
}

export default Filter
