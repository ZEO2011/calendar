// Libraries
import { lastDayOfMonth } from "date-fns"

// Componenets
import Day from "./Day"

// Hooks
import { useId } from "react"
import useDate from "../hooks/useDate"

export default function Days() {
	const { date } = useDate()
	const days = Array.from(
		{ length: lastDayOfMonth(date).getDate() },
		(_, i) => i + 1,
	)
	const dayId = useId()
	return (
		<div className="days">
			{days.map((el: number) => {
				return (
					<Day
						id={`${dayId}-${el}`}
						key={`${dayId}-${el}`}
						el={el}
					/>
				)
			})}
		</div>
	)
}
