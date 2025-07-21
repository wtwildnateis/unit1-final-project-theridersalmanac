import { useState, useEffect, useRef } from 'react';
import './AddEventModal.css';

const AddEventModal = ({ date, onClose, onSave, position, initialEvent, mode = "add" }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        flyer: '',
        start: date || new Date(),
        end: date || new Date(),
        location: '',
        description: '',
    });

    useEffect(() => {
        if (initialEvent) {
            setFormData({
                title: initialEvent.title || '',
                type: initialEvent.type || '',
                flyer: initialEvent.flyer || '',
                start: initialEvent.start ? new Date(initialEvent.start) : date || new Date(),
                end: initialEvent.end ? new Date(initialEvent.end) : date || new Date(),
                location: initialEvent.location || '',
                description: initialEvent.description || '',

            });
        }
    }, [initialEvent, date]);

    const modalRef = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }

        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

        };
    }, []);

function formatDateTimeLocal(date) {
    if (!date) return '';

    const pad = (n) => n.toString().padStart(2, '0');

    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());

    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modalcontainer">

            <div className="modalstyle"
                ref={modalRef}
                style={{
                    top: `${position.top || 0}px`,
                    left: `${position.left || 0}px`
                }}
            >
                <h3>{mode === "edit" ? "Edit Event Details" : "Add New Biking Event"}</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                    <label>
                        Event Name:
                        <input
                            type="text"
                            name="title"
                            placeholder="Event Name"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Type of Event:
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required>
                            <option value="">Select Type</option>
                            <option value="Bike Race">Bike Race</option>
                            <option value="BMX Jam">BMX Jam</option>
                            <option value="Group Ride">Group Ride</option>
                            <option value="Meet Ups">Meet Ups</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label>
                        Start Time:
                        <input
                            type="datetime-local"
                            name="start"
                            onChange={handleChange}
                            required
                            value={formatDateTimeLocal(formData.start)}
                        />
                    </label>

                    <label>
                        End Time:
                        <input
                            type="datetime-local"
                            name="end"
                            onChange={handleChange}
                            required
                            value={formatDateTimeLocal(formData.end)}
                        />
                    </label>

                    <label>
                        Meet-up Location:
                        <input
                            type="text"
                            name="location"
                            placeholder="Meet-up Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Additional Info:
                        <textarea
                            name="description"
                            placeholder="Additional Info"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Upload Flyer URL (Optional):
                        <input
                            type="text"
                            name="flyer"
                            placeholder="Paste direct link to image"
                            value={formData.flyer}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="modal-button">
                        <button type="submit">{mode === "edit" ? "Save Changes" : "Add Event"}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;