import { useState, useEffect, useRef } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventModal from "./AddEventModal";
import { enUS } from "date-fns/locale/en-US";
import ViewEventModal from "./ViewEventModal";
import CustomToolbar from "./CustomToolbar";
import { addMonths, subMonths, startOfToday } from 'date-fns';

const locales = {
    'en-US': enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,

});

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [viewModalPosition, setViewModalPosition] = useState({ top: 0, left: 0 })
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventTypeFilter, setEventTypeFilter] = useState("All");
    const [currentDate, setCurrentDate] = useState(new Date());

    const getNextDate = (action, current) => {
        switch (action) {
            case 'TODAY':
                return startOfToday();
            case 'PREV':
                return subMonths(current, 1);
            case 'NEXT':
                return addMonths(current, 1);
            default:
                return current;
        }
    };

    const filteredEvents = eventTypeFilter === "All"
        ? events
        : events.filter(e => e.type === eventTypeFilter);



    const CustomDateCellWrapper = ({ value, children }) => {
        const stringDate = new Date(value).toISOString();
        return (
            <div className="rbc-day-bg" data-date={stringDate}>
                {children}
            </div>
        );
    };

    const handleSelectSlot = (slotInfo, e) => {
        const allCells = document.querySelectorAll('.rbc-day-bg');
        const clickedDate = slotInfo.start;

        let foundCell = null;
        allCells.forEach(cell => {
            const cellDate = cell.getAttribute('data-date');
            if (cellDate) {
                const cellTime = new Date(cellDate).toDateString();
                if (cellTime === new Date(clickedDate).toDateString()) {
                    foundCell = cell;
                }
            }
        });

        if (foundCell) {
            const rect = foundCell.getBoundingClientRect();
            const modalWidth = 400;
            const modalHeight = 300;

            const left = Math.min(window.innerWidth - modalWidth - 20, rect.left + window.scrollX);
            const top = Math.min(window.innerHeight - modalHeight - 20, rect.top + window.scrollY);

            const calendarContainer = document.querySelector('.calendarcontainer');
            const containerRect = calendarContainer.getBoundingClientRect();

            setModalPosition({
                top: rect.top - containerRect.top,
                left: rect.left - containerRect.left
            });
        }

        setSelectedDate(slotInfo.start);
        setShowModal(true);


    };

    const handleAddEvent = (newEvent) => {
        const eventWithDates = {
            ...newEvent,
            id: Date.now(),
            start: new Date(newEvent.start),
            end: new Date(newEvent.end)
        };
        setEvents(prev => [...prev, eventWithDates]);
        setShowModal(false);
    };

    useEffect(() => {
        const storedEvents = localStorage.getItem("bikingEvents");
        if (storedEvents) {
            try {
                const parsed = JSON.parse(storedEvents);
                const converted = parsed.map(ev => ({
                    ...ev,
                    start: new Date(ev.start),
                    end: new Date(ev.end)
                }));

                setEvents(converted);
            } catch (err) {
            }
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem("bikingEvents", JSON.stringify(events));
        }
    }, [events, hasLoaded]);

    const handleSelectedEvent = (event) => {
        const allCells = document.querySelectorAll('.rbc-event');
        let foundEvent = null;

        for (const el of allCells) {
            if (el.innerText.trim().includes(event.title)) {
                foundEvent = el;
                break;
            }
        }

        if (foundEvent) {
            const rect = foundEvent.getBoundingClientRect();
            const container = document.querySelector('.calendarcontainer');
            const containerRect = container.getBoundingClientRect();

            setViewModalPosition({
                top: rect.top - containerRect.top,
                left: rect.left - containerRect.left
            });

            setSelectedEvent(event);
        }
    };

    const handleEditRequest = (eventData) => {
        setSelectedEvent(null);
        setEditingEvent(eventData);
    };

    const handleDeleteEvent = (id) => {
        setEvents(prev => prev.filter(ev => ev.id !== id));
        setSelectedEvent(null);
    };

    const handleEditEvent = (updatedEvent) => {
        setEvents(prev =>
            prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev)

        );
    };

    return (
        <div className="calendarcontainer" style={{ position: "relative" }}>
            <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                onNavigate={(newDate) => setCurrentDate(newDate)}
                style={{ height: 600, margin: '50px' }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectedEvent}
                components={{
                    dateCellWrapper: CustomDateCellWrapper,
                    toolbar: (toolbarProps) => (
                        <CustomToolbar
                            {...toolbarProps}
                            onNavigate={(action) => {
                                const newDate = getNextDate(action, currentDate);
                                setCurrentDate(newDate);
                            }}
                            onTypeFilterChange={setEventTypeFilter}
                            currentType={eventTypeFilter}
                        />
                    )
                }}
            />

            {(showModal || editingEvent) && (
                <AddEventModal
                    date={editingEvent?.start || selectedDate}
                    initialEvent={editingEvent || null}
                    onClose={() => {
                        setShowModal(false);
                        setEditingEvent(null);
                    }}
                    onSave={(eventData) => {
                        if (editingEvent) {
                            handleEditEvent({ ...eventData, id: editingEvent.id });
                            setEditingEvent(null);
                        } else {
                            handleAddEvent(eventData);
                            setShowModal(false);
                        }
                    }}

                    position={editingEvent ? viewModalPosition : modalPosition}
                    mode={editingEvent ? "edit" : "add"}
                />
            )}

            {selectedEvent && selectedEvent.start && (
                <ViewEventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onEditRequest={handleEditRequest}
                    onDelete={handleDeleteEvent}
                    position={viewModalPosition}
                />
            )}
        </div>
    );
};

export default EventCalendar;
