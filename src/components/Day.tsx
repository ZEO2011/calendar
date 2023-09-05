// libraries
import { format, isSameDay } from "date-fns"

// Hooks
import { useState } from "react"
import useDate from "../hooks/useDate"

// Components
import NewEventForm, { eventType } from "./NewEventForm"
import Event from "./Event"

export default function Day({ el, id }: { el: number; id: string }) {
	const { date } = useDate()
	const [newEventStatus, setNewEventStatus] = useState<boolean>(false)
	const [events, setEvents] = useState<eventType[] | undefined>([])
	const currentDay = format(
		new Date(date.getFullYear(), date.getMonth(), el),
		"d/MM/YYY",
	)
	function addEventHandler() {
		setNewEventStatus(true)
	}
	function closeNewEventFormHandler() {
		setNewEventStatus(false)
	}
	function getFormData(data: eventType) {
		console.log(data.currentDate)
		setEvents((current) => {
			if (current !== undefined) return [...current, data]
			return [data].sort((a, b) => {
				if (a.startTime === undefined || b.startTime === undefined)
					return 0
				const value1 = format(
					new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDay(),
						parseInt(a.startTime.split(":")[0]),
					),
					"HH",
				)
				const value2 = format(
					new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDay(),
						parseInt(b.startTime.split(":")[0]),
					),
					"HH",
				)
				return value1 < value2 ? 0 : 1
			})
		})
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
						getData={getFormData}
					/>
				) : null}
				<div className="events">
					{events
						?.sort((a, b) => {
							if (
								a.startTime !== undefined &&
								b.startTime !== undefined
							) {
								return a.startTime > b.startTime
									? 1
									: a.startTime < b.startTime
									? -1
									: 0
							}
							return 1
						})
						.map((event) => {
							if (event.currentDate === currentDay)
								return (
									<Event
										key={event.id}
										name={event.name}
										startTime={event.startTime}
										eventColor={event.eventColor}
										isAllDay={event.allDay}
									/>
								)
						})}
				</div>
			</div>
		</div>
	)
}
