// Styles
import "./styles/style.css"

// Hooks
import { useState } from "react"

// Components
import Control from "./components/Control"
import Days from "./components/Days"

export default function App() {
	const [today, setToday] = useState<Date>(new Date())
	return (
		<>
			<div className="calendar">
				<Control today={today} setToday={setToday} />
				<Days date={today} />
			</div>
		</>
	)
}
