import { useState, useEffect, useRef } from 'react';
import './AddEventModal.css';

const ViewEventModal = ({ event, onClose, onDelete, onEditRequest, position }) => {
    const modalRef = useRef();
    const [showFullFlyer, setShowFullFlyer] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="modalcontainer">
            <div
                className="modalstyle"
                ref={modalRef}
                style={{
                    top: `${position.top || 0}px`,
                    left: `${position.left || 0}px`,
                    position: 'absolute'
                }}
            >
                {event.flyer && (
                    <div className="flyer-preview" onClick={() => setShowFullFlyer(true)}>
                        <img src={event.flyer} alt="Event Flyer" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', cursor: 'pointer' }} />
                    </div>
                )}

                <h2 style={{ marginTop: '10px' }}>{event.title}</h2>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>

                <div className="modal-button">
                    <button type="button" onClick={() => onEditRequest(event)}>Edit</button>
                    <button type="button" onClick={() => onDelete(event.id)}>Delete</button>
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </div>

            {showFullFlyer && (
                <div className="flyer-fullscreen" onClick={() => setShowFullFlyer(false)} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <img src={event.flyer} alt="Flyer Full"/>
                </div>
            )}
        </div>
    );
};

export default ViewEventModal;