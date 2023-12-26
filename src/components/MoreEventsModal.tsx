import Event from "./Event"
import { eventType } from "./NewEventForm"

export default function MoreEventsModal({ events, closeClick }: {
    events: eventType[]
    closeClick: () => void
}) {

    return <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
            <div className="modal-title">
                <div>events</div>
                <button className="close-btn" onClick={closeClick}>&times;</button>
            </div>
            <div className="events">
                {events.map(event => <Event {...event} key={event.id} currentDay={event.currentDate} eventColor={event.eventColor} isAllDay={event.allDay} eventId={event.id} />)}
            </div>
        </div>
    </div>
}

