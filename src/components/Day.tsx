// libraries
import { format, isSameDay } from "date-fns"

// Hooks
import { useEffect, useRef, useState } from "react"
import useDate from "../contexts/useDate"
import useEvents from "../contexts/useEvents"

// Components
import NewEventForm, { eventType } from "./NewEventForm"
import Event from "./Event"
import { createPortal } from "react-dom"
import MoreEventsModal from "./MoreEventsModal"

export default function Day({ el, id }: { el: number; id: string }) {
    const { date } = useDate()
    const [newEventStatus, setNewEventStatus] = useState<boolean>(false)
    const { events, setEvents } = useEvents()
    const currentDay = format(
        new Date(date.getFullYear(), date.getMonth(), el),
        "d/MM/YYY",
    )
    const dayRef = useRef<HTMLDivElement>(null)
    function addEventHandler() {
        setNewEventStatus(true)
    }
    function closeNewEventFormHandler() {
        setNewEventStatus(false)
    }

    const [showMoreModel, setShowMoreModal] = useState<boolean>(false)
    const [moreEventsBtn, setMoreEventsBtn] = useState<{ isOverflow: boolean, overFlowAt: number }>({ isOverflow: false, overFlowAt: 0 })
    const checkOverflow = () => {
        const filtered = events?.filter(event => event.currentDate === currentDay) ?? [];
        const headerHeight = 38;
        const eventsContainerHeight = dayRef.current!.clientHeight - headerHeight;
        const eventHeight = 30;
        const eventsHeight = filtered.length * eventHeight;
        const getOverflow = () => {
            let overAt = filtered.length;
            for (let i = 0; i <= filtered.length; i++) {
                const num = i * eventHeight;
                if (num > eventsContainerHeight) {
                    overAt = i - 1;
                    break;
                }
            }
            return overAt;
        }
        if (eventsHeight > eventsContainerHeight) {
            console.log("overflow", eventsHeight, eventsContainerHeight, el)
            const pullshit = () => {
                const value = getOverflow()
                console.log(value)
                return value;
            }
            setMoreEventsBtn(c => {
                if (c.isOverflow) return c;
                return {
                    isOverflow: true,
                    overFlowAt: pullshit()
                }
            })
        } else {
            setMoreEventsBtn({ isOverflow: false, overFlowAt: 0 })
        }
    }
    useEffect(() => {
        const resizeObserver = new ResizeObserver(checkOverflow)
        resizeObserver.observe(dayRef.current!)
    }, [])
    useEffect(checkOverflow, [checkOverflow])
    useEffect(() => {
        addEventListener("resize", checkOverflow)
        return () => {
            removeEventListener("resize", checkOverflow)
        }
    }, [checkOverflow])
    function getFormData(data: eventType) {
        setEvents((current) => {
            if (current !== undefined) return [...current, data]
            return [data].sort((a, b) => {
                if (a.startTime === undefined || b.startTime === undefined)
                    return 0
                const value1 = format(
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDay(),
                        parseInt(a.startTime.split(":")[0]),
                    ),
                    "HH",
                )
                const value2 = format(
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDay(),
                        parseInt(b.startTime.split(":")[0]),
                    ),
                    "HH",
                )
                return value1 < value2 ? 0 : 1
            })
        })
    }
    return (
        <div className="day" id={id} ref={dayRef}>
            <div className="day-header">
                <div className="week-name">
                    {format(
                        new Date(date.getFullYear(), date.getMonth(), el),
                        "EEE",
                    )}
                </div>
                <div
                    className={`day-number ${isSameDay(
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
                <button className="add-event-btn" onClick={addEventHandler}>
                    +
                </button>
                {newEventStatus ? (
                    <NewEventForm
                        closeClick={closeNewEventFormHandler}
                        statusSetter={setNewEventStatus}
                        currentDate={el}
                        getData={getFormData}
                    />
                ) : null}
                <div className="events">
                    {events
                        ?.sort((a, b) => {
                            if (
                                a.startTime !== undefined &&
                                b.startTime !== undefined
                            ) {
                                return a.startTime > b.startTime
                                    ? 1
                                    : a.startTime < b.startTime
                                        ? -1
                                        : 0
                            }
                            return 1
                        }).filter(event => event.currentDate === currentDay).slice(0, moreEventsBtn.isOverflow ? moreEventsBtn.overFlowAt - 1 : undefined)
                        .map((event) => {
                            return (
                                <Event
                                    currentDay={currentDay}
                                    key={event.id}
                                    name={event.name}
                                    startTime={event.startTime}
                                    eventColor={event.eventColor}
                                    isAllDay={event.allDay}
                                    eventId={event.id}
                                    endTime={event.endTime}
                                />
                            )
                        })}
                    {moreEventsBtn.isOverflow ? <button onClick={() => setShowMoreModal(true)}>see more</button> : null}
                    {showMoreModel ? <MoreEventsModal closeClick={() => setShowMoreModal(false)} events={events?.filter(event => event.currentDate === currentDay) ?? []} /> : null}
                </div>
            </div>
        </div>
    )
}
