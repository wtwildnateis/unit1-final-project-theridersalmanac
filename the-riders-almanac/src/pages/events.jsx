import EventCalendar from "../components/Calendar/Calendar";

const Events = () => {
    return (
        <>
            <div className="universalpagecontainer">
                <div className="eventspage">
                    <h2>Events Page</h2>
                    <EventCalendar />
                </div>
            </div>
        </>
    );
};

export default Events;