// Types
import { format } from "date-fns"
import type { Dispatch, SetStateAction } from "react"

// Hooks
import { FormEvent, useRef, useState } from "react"
import { createPortal } from "react-dom"

export default function NewEventForm({
	closeClick,
	statusSetter,
	currentDate,
	date,
}: {
	closeClick: () => void
	statusSetter: Dispatch<SetStateAction<boolean>>
	currentDate: number
	date: Date
}) {
	const modalRef = useRef<HTMLDivElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const startTimeRef = useRef<HTMLInputElement>(null)
	const endTimeRef = useRef<HTMLInputElement>(null)
	const [allDayCheckbox, setAllDayCheckbox] = useState<boolean>()
	const [eventColor, setEventColor] = useState<string>("blue")
	function formHandler(e: FormEvent) {
		e.preventDefault()
		const chosenStartHour: number = Number(
			startTimeRef.current?.value.split(":")[0],
		)
		const chosenEndHour: number = Number(
			endTimeRef.current?.value.split(":")[0],
		)
		const starHour = new Date().setHours(chosenStartHour)
		const start = format(starHour, "HH")
		const endHour = new Date().setHours(chosenEndHour)
		const end = format(endHour, "HH")
		if (start > end)
			return alert("start date must be before the end date")
		// return statusSetter(false)
	}
	const year = date.getFullYear()
	const month = date.getMonth()
	return createPortal(
		<>
			<div className="modal" ref={modalRef}>
				<div className="overlay"></div>
				<div className="modal-body">
					<div className="modal-title">
						<div>Add Event</div>
						<small>
							{format(
								new Date(year, month, currentDate),
								"d/M/YYY",
							)}
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
									checked
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
								Add
							</button>
							<button
								className="btn btn-delete"
								type="button"
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			</div>
		</>,
		document.getElementById("alert-messages") as Element,
	)
}
