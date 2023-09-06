// Hooks
import { useContext } from "react"

// Contexts
import { MainDate } from "../App"

export default function useDate() {
	const date = useContext(MainDate)
	if (date == null) throw new Error("main date is null")
	return date
}
