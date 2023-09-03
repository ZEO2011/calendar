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
	/// get the previous month function
	function previousMonthHandler() {
		setToday((current) => {
			return new Date(current.setMonth(current.getMonth() - 1))
		})
	}
	/// get the next month function
	function nextMonthHandler() {
		setToday((current) => {
			return new Date(current.setMonth(current.getMonth() + 1))
		})
	}
	/// get the current month function
	function currentMonth() {
		setToday(new Date())
	}
	return (
		<>
			<div className="header">
				<button className="btn" onClick={currentMonth}>
					Today
				</button>
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
