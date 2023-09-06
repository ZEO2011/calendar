// Libraries
import { lastDayOfMonth } from "date-fns"

// Componenets
import Day from "./Day"

// Hooks
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useId,
	useState,
} from "react"
import useDate from "../contexts/useDate"
import { eventType } from "./NewEventForm"

// types
type daysContextType = {
	events: eventType[] | undefined
	setEvents: Dispatch<SetStateAction<eventType[] | undefined>>
}

// Contexts
export const MainEvents = createContext<daysContextType | null>(null)

export default function Days() {
	const { date } = useDate()
	const days = Array.from(
		{ length: lastDayOfMonth(date).getDate() },
		(_, i) => i + 1,
	)
	const dayId = useId()
	const [events, setEvents] = useState<eventType[] | undefined>([])
	useEffect(() => {
		if (localStorage.getItem("events") === null && events?.length === 0) {
			localStorage.setItem("events", JSON.stringify([]))
		}
	}, [])
	return (
		<div className="days">
			<MainEvents.Provider value={{ events, setEvents }}>
				{days.map((el: number) => {
					return (
						<Day
							id={`${dayId}-${el}`}
							key={`${dayId}-${el}`}
							el={el}
						/>
					)
				})}
			</MainEvents.Provider>
		</div>
	)
}
