// Libraries
import { lastDayOfMonth, isSameDay } from "date-fns"

// Componenets
import Day from "./Day"

// Hooks
import { useId } from "react"

export default function Days({ date }: { date: Date }) {
	const days = Array.from(
		{ length: lastDayOfMonth(date).getDate() },
		(_, i) => i + 1,
	)
	const dayId = useId()
	return (
		<div className="days">
			{days.map((el: number) => {
				return <Day key={`${dayId}-${el}`} date={date} el={el} />
			})}
		</div>
	)
}
