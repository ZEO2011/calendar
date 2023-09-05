import { format } from "date-fns"
import useDate from "../hooks/useDate"

export default function Event({
	eventColor,
	startTime,
	name,
	isAllDay,
}: {
	eventColor: string
	startTime: string | undefined
	name: string | undefined
	isAllDay: boolean
}) {
	const { date } = useDate()
	const value = startTime !== undefined ? parseInt(startTime) : 0
	let hour
	if (!isAllDay)
		hour = format(
			new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDay(),
				value,
			),
			"hh:mm",
		)
	return (
		<>
			<button
				className={`${
					isAllDay ? `all-day-event ${eventColor}` : ""
				} event`}
			>
				{isAllDay ? null : (
					<>
						<div className={`color-dot ${eventColor}`}></div>
						<div className="event-time">{hour}</div>
					</>
				)}
				<div className="event-name">{name}</div>
			</button>
		</>
	)
}
