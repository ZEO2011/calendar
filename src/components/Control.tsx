// libraries
import { format } from "date-fns"

// Hooks
import useDate from "../contexts/useDate"

export default function Control() {
	const { date, setDate } = useDate()
	/// get the previous month function
	function previousMonthHandler() {
		setDate((current) => {
			return new Date(current.setMonth(current.getMonth() - 1))
		})
	}
	/// get the next month function
	function nextMonthHandler() {
		setDate((current) => {
			return new Date(current.setMonth(current.getMonth() + 1))
		})
	}
	/// get the current month function
	function currentMonth() {
		setDate(new Date())
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
				<span className="month-title">{format(date, "MMM y")}</span>
			</div>
		</>
	)
}
