// Types
import { format } from "date-fns"
import type { Dispatch, MouseEventHandler, SetStateAction } from "react"
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> | undefined

// Hooks
import { FormEvent, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { eventType } from "./NewEventForm"

export default function EditEventForm({
	currentDay,
	closeClick,
	name,
	isAllDay,
	startTime,
	endTime,
	defEventColor,
	statusSetter,
	getData,
}: {
	currentDay: string
	name: string | undefined
	isAllDay: boolean
	startTime: string | undefined
	endTime: string | undefined
	defEventColor: string
	closeClick: MouseEventHandler<HTMLButtonElement>
	statusSetter: Dispatch<SetStateAction<boolean>>
	getData: (data: Omit<eventType, "id">) => void
}) {
	const modalRef = useRef<HTMLDivElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const startTimeRef = useRef<HTMLInputElement>(null)
	const endTimeRef = useRef<HTMLInputElement>(null)
	const [allDayCheckbox, setAllDayCheckbox] = useState<boolean>(isAllDay)
	const [eventColor, setEventColor] = useState<string>(defEventColor)
	function formHandler(e: FormEvent) {
		e.preventDefault()
		e.preventDefault()
		if (!allDayCheckbox) {
			const chosenStartHour: number = Number(
				startTimeRef.current?.value.split(":")[0],
			)
			const chosenEndHour: number = Number(
				endTimeRef.current?.value.split(":")[0],
			)
			const startHour = new Date().setHours(chosenStartHour)
			const start = format(startHour, "HH")
			const endHour = new Date().setHours(chosenEndHour)
			const end = format(endHour, "HH")
			if (start > end)
				return alert("start date must be before the end date")
		}
		const event: Omit<eventType, "id"> = {
			name: nameRef.current?.value,
			allDay: allDayCheckbox,
			eventColor: eventColor,
			startTime: startTimeRef.current?.value,
			endTime: endTimeRef.current?.value,
			currentDate: currentDay,
		}
		getData(event)
		return statusSetter(false)
	}
	return createPortal(
		<>
			<div className="modal" ref={modalRef}>
				<div className="overlay"></div>
				<div className="modal-body">
					<div className="modal-title">
						<div>Edit Event</div>
						<small>
							{format(new Date(currentDay), "d/M/YYY")}
						</small>
						<button
							className="close-btn"
							onClick={closeClick}
						>
							&times;
						</button>
					</div>
					<form onSubmit={(e) => formHandler(e)}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								required
								defaultValue={name}
								ref={nameRef}
							/>
						</div>
						<div className="form-group checkbox">
							<input
								type="checkbox"
								name="all-day"
								id="all-day"
								checked={allDayCheckbox}
								onChange={(e) => {
									setAllDayCheckbox(e.target.checked)
								}}
							/>
							<label htmlFor="all-day">All Day?</label>
						</div>
						<div className="row">
							<div className="form-group">
								<label htmlFor="start-time">
									Start Time
								</label>
								<input
									type="time"
									name="start-time"
									id="start-time"
									defaultValue={startTime}
									ref={startTimeRef}
									disabled={allDayCheckbox}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="end-time">
									End Time
								</label>
								<input
									type="time"
									name="end-time"
									id="end-time"
									defaultValue={endTime}
									ref={endTimeRef}
									disabled={allDayCheckbox}
									required
								/>
							</div>
						</div>
						<div className="form-group">
							<label>Color</label>
							<div className="row left">
								<input
									type="radio"
									name="color"
									value="blue"
									id="blue"
									defaultChecked={
										defEventColor === "blue"
									}
									className="color-radio"
									onClick={(e) =>
										setEventColor(
											e.currentTarget.value,
										)
									}
								/>
								<label htmlFor="blue">
									<span className="sr-only">
										Blue
									</span>
								</label>
								<input
									type="radio"
									name="color"
									value="red"
									id="red"
									className="color-radio"
									defaultChecked={
										defEventColor === "red"
									}
									onClick={(e) =>
										setEventColor(
											e.currentTarget.value,
										)
									}
								/>
								<label htmlFor="red">
									<span className="sr-only">
										Red
									</span>
								</label>
								<input
									type="radio"
									name="color"
									value="green"
									id="green"
									className="color-radio"
									defaultChecked={
										defEventColor === "green"
									}
									onClick={(e) =>
										setEventColor(
											e.currentTarget.value,
										)
									}
								/>
								<label htmlFor="green">
									<span className="sr-only">
										Green
									</span>
								</label>
							</div>
						</div>
						<div className="row">
							<button
								className="btn btn-success"
								type="submit"
							>
								edit
							</button>
							<button
								onClick={() => getData(undefined)}
								className="btn btn-delete"
							>
								delete
							</button>
						</div>
					</form>
				</div>
			</div>
		</>,
		document.getElementById("alert-messages") as Element,
	)
}
