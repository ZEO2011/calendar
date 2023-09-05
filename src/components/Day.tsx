// libraries
import { format, isSameDay } from "date-fns"

// Types
import type { ReactNode } from "react"

// Hooks
import { useState } from "react"

// Components
import NewEventForm from "./NewEventForm"

export default function Day({
	el,
	date,
	children,
	id,
}: {
	el: number
	date: Date
	children?: ReactNode
	id: string
}) {
	const [newEventStatus, setNewEventStatus] = useState<boolean>(false)
	function addEventHandler() {
		setNewEventStatus(true)
	}
	function closeNewEventFormHandler() {
		setNewEventStatus(false)
	}
	return (
		<div className="day" id={id}>
			<div className="day-header">
				<div className="week-name">
					{format(
						new Date(date.getFullYear(), date.getMonth(), el),
						"EEE",
					)}
				</div>
				<div
					className={`day-number ${
						isSameDay(
							new Date(
								date.getFullYear(),
								date.getMonth(),
								el,
							),
							new Date(),
						)
							? "today"
							: ""
					}`}
				>
					{el}
				</div>
				<button className="add-event-btn" onClick={addEventHandler}>
					+
				</button>
				{newEventStatus ? (
					<NewEventForm
						closeClick={closeNewEventFormHandler}
						statusSetter={setNewEventStatus}
						currentDate={el}
						date={date}
					/>
				) : null}
				<div className="events">{children}</div>
			</div>
		</div>
	)
}
