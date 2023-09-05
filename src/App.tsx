// Styles
import "./styles/style.css"

// Hooks
import { createContext, useState } from "react"

// Types
import type { Dispatch, SetStateAction } from "react"

// Components
import Control from "./components/Control"
import Days from "./components/Days"

type dateContext = {
	date: Date
	setDate: Dispatch<SetStateAction<Date>>
}

// date context

export const MainDate = createContext<dateContext | null>(null)

export default function App() {
	const [date, setDate] = useState<Date>(new Date())
	return (
		<>
			<div className="calendar">
				<MainDate.Provider value={{ date, setDate }}>
					<Control />
					<Days />
				</MainDate.Provider>
			</div>
		</>
	)
}
