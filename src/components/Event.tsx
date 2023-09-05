import { format } from "date-fns"
import useDate from "../hooks/useDate"
import { Dispatch, SetStateAction, useState } from "react"
import EditEventForm from "./EditEventForm"
import { eventType } from "./NewEventForm"

export default function Event({
	eventColor,
	startTime,
	name,
	isAllDay,
	eventId,
	endTime,
	currentDay,
	eventsSetter,
}: {
	eventColor: string
	startTime: string | undefined
	endTime: string | undefined
	name: string | undefined
	isAllDay: boolean
	eventId: string
	currentDay: string
	eventsSetter: Dispatch<SetStateAction<eventType[] | undefined>>
}) {
	const { date } = useDate()
	const [editEventStatus, setEditEventStatus] = useState<boolean>(false)
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
	function eventHandler() {
		setEditEventStatus(true)
	}
	function getData(data: Omit<eventType, "id"> | undefined) {
		eventsSetter((current) => {
			return current?.map((event) => {
				if (data !== undefined) {
					if (event.id == eventId) {
						event = {
							id: eventId,
							name: data.name,
							allDay: data.allDay,
							currentDate: currentDay,
							startTime: data.startTime,
							endTime: data.endTime,
							eventColor: data.eventColor,
						}
					}
				} else {
					current.splice(current.indexOf(event), 1)
				}
				return event
			})
		})
	}
	return (
		<>
			<button
				onClick={eventHandler}
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
			{editEventStatus ? (
				<EditEventForm
					currentDay={currentDay}
					closeClick={() => setEditEventStatus(false)}
					name={name}
					isAllDay={isAllDay}
					startTime={startTime}
					endTime={endTime}
					defEventColor={eventColor}
					getData={getData}
					statusSetter={setEditEventStatus}
				/>
			) : null}
		</>
	)
}
