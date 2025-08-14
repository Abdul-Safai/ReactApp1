import React, { useState, useEffect } from 'react';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('reservations');
    if (saved) {
      setReservations(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (editingIndex !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editingIndex]);

  const addReservation = (reservation) => {
    setReservations([...reservations, reservation]);
    setSuccessMessage('✅ Reservation successful!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const updateReservation = (updatedReservation) => {
    const updated = reservations.map((res, index) =>
      index === editingIndex ? updatedReservation : res
    );
    setReservations(updated);
    setEditingIndex(null);
    setSuccessMessage('✏️ Reservation updated!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const deleteReservation = (index) => {
    const updated = reservations.filter((_, i) => i !== index);
    setReservations(updated);
    if (index === editingIndex) {
      setEditingIndex(null);
    }
  };

  const clearAllReservations = () => {
    const confirmClear = window.confirm("Are you sure you want to delete all reservations?");
    if (confirmClear) {
      setReservations([]);
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="App">
      <header className="main-header">
        <h1>🌿 Conservation Area Reservation System</h1>
      </header>

      <section className="form-section">
        <div className="section-banner green-banner">
          {editingIndex !== null ? '✏️ Edit Reservation' : '📝 Make a Reservation'}
        </div>

        <ReservationForm
          onAdd={addReservation}
          onUpdate={updateReservation}
          reservations={reservations}
          editingIndex={editingIndex}
          editingData={editingIndex !== null ? reservations[editingIndex] : null}
        />

        {editingIndex !== null && (
          <button className="cancel-btn" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}

        {successMessage && <p className="success">{successMessage}</p>}
      </section>

      <section className="reservation-section">
        <div className="section-banner purple-banner">📋 Current Reservations</div>
        <ReservationList
          reservations={reservations}
          onDelete={deleteReservation}
          onEdit={setEditingIndex}
        />

        {reservations.length > 0 && (
          <button className="clear-all-btn" onClick={clearAllReservations}>
            🧹 Clear All Reservations
          </button>
        )}
      </section>
    </div>
  );
}

export default App;
