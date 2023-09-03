// Styles
import "./styles/style.css"

// Libraries
import { addMonths, format, getMonth, setMonth } from "date-fns"

// Hooks
import { useState } from "react"

export default function App() {
	const [today, setToday] = useState<Date>(new Date())
	function previousMonthHandler() {
		setToday((current) => {
			return new Date(current.setMonth(current.getMonth() - 1))
		})
	}
	function nextMonthHandler() {
		setToday((current) => {
			return new Date(current.setMonth(current.getMonth() + 1))
		})
	}
	return (
		<>
			<div className="calendar">
				<div className="header">
					<button className="btn">Today</button>
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
				{/* <div className="modal">
				<div className="overlay"></div>
				<div className="modal-body">
					<div className="modal-title">
						6/8/23
						<button className="close-btn">&times;</button>
					</div>
					<div className="events">
						<button className="all-day-event green event">
							<div className="event-name">Short</div>
						</button>
						<button className="event">
							<div className="color-dot blue"></div>
							<div className="event-time">7am</div>
							<div className="event-name">Event Name</div>
						</button>
						<button className="event">
							<div className="color-dot green"></div>
							<div className="event-time">8am</div>
							<div className="event-name">Event Name</div>
						</button>
						<button className="event">
							<div className="color-dot blue"></div>
							<div className="event-time">9am</div>
							<div className="event-name">Event Name</div>
						</button>
						<button className="event">
							<div className="color-dot blue"></div>
							<div className="event-time">10am</div>
							<div className="event-name">Event Name</div>
						</button>
					</div>
				</div>
			</div> */}
				{/* <div className="modal">
				<div className="overlay"></div>
				<div className="modal-body">
					<div className="modal-title">
						<div>Add Event</div>
						<small>6/8/23</small>
						<button className="close-btn">&times;</button>
					</div>
					<form>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input type="text" name="name" id="name" />
						</div>
						<div className="form-group checkbox">
							<input
								type="checkbox"
								name="all-day"
								id="all-day"
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
			</div> */}
			</div>
		</>
	)
}
