import React, { useState, useEffect } from 'react';

const timeSlots = [
  '9:00 AM – 12:00 PM',
  '12:00 PM – 3:00 PM',
  '3:00 PM – 6:00 PM',
];

const areas = [
 'East Conservation Area',
 'West Conservation Area',
 'North Conservation Area',
 'South Conservation Area',
];

const initialFormState = {
  name: '',
  email: '',
  area: '',
  timeSlot: '',
};

const ReservationForm = ({
  onAdd,
  onUpdate,
  reservations,
  editingIndex,
  editingData,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (editingIndex !== null && editingData) {
      setFormData(editingData);
    } else {
      setFormData(initialFormState);
    }
  }, [editingIndex, editingData]);

  useEffect(() => {
    if (formData.area) {
      const takenSlots = reservations
        .filter((r, i) => r.area === formData.area && i !== editingIndex)
        .map((r) => r.timeSlot);

      const filtered = timeSlots.filter((slot) => !takenSlots.includes(slot));
      setAvailableSlots(filtered);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.area, reservations, editingIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <select
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange}
        required
      >
        <option value="">Select Conservation Area</option>
        {areas.map((area, index) => (
          <option key={index} value={area}>
            {area}
          </option>
        ))}
      </select>

      <select
        id="timeSlot"
        name="timeSlot"
        value={formData.timeSlot}
        onChange={handleChange}
        required
        disabled={!formData.area}
      >
        <option value="">Select Time Slot</option>
        {availableSlots.map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </select>

      <button type="submit">
        {editingIndex !== null ? 'Update Reservation' : 'Make Reservation'}
      </button>
    </form>
  );
};

export default ReservationForm;
