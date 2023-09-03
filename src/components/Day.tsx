// libraries
import { format, isSameDay } from "date-fns"

export default function Day({ el, date }: { el: number; date: Date }) {
	return (
		<div className="day">
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
			</div>
		</div>
	)
}
