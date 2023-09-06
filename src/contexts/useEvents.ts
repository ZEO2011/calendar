// Hooks
import { useContext } from "react"

// Contexts
import { MainEvents } from "../components/Days"

export default function useDate() {
	const date = useContext(MainEvents)
	if (date == null) throw new Error("main date is null")
	return date
}
