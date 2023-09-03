// libraries
import { format } from "date-fns"

// types
import type { Dispatch, SetStateAction } from "react"

export default function Control({
	today,
	setToday,
}: {
	today: Date
	setToday: Dispatch<SetStateAction<Date>>
}) {
	function previousMonthHandler() {
		setToday((current) => {
			return new Date(current.setMonth(current.getMonth() - 1))
		})
	}
	function nextMonthHandler() {
		setToday((current) => {
			return new Date(current.setMonth(current.getMonth() + 1))
		})
	}
	return (
		<>
			<div className="header">
				<button className="btn">Today</button>
				<div>
					<button
						className="month-change-btn"
						onClick={previousMonthHandler}
					>
						&lt;
					</button>
					<button
						className="month-change-btn"
						onClick={nextMonthHandler}
					>
						&gt;
					</button>
				</div>
				<span className="month-title">
					{format(today, "MMM y")}
				</span>
			</div>
		</>
	)
}
