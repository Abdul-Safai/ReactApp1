import React from 'react';

const timeSlots = [
  '9:00 AM – 12:00 PM',
  '12:00 PM – 3:00 PM',
  '3:00 PM – 6:00 PM',
];

const areaOrder = [
  'East Conservation Area',
  'West Conservation Area',
  'North Conservation Area',
  'South Conservation Area',
];

const ReservationList = ({ reservations, onDelete, onEdit }) => {
  const groupedReservations = areaOrder.reduce((acc, area) => {
    acc[area] = reservations.filter(res => res.area === area);
    return acc;
  }, {});

  return (
    <div className="reservation-section">
      <h2 className="section-header">📋 Current Reservations</h2>
      {reservations.length === 0 ? (
        <p className="empty-message">No reservations yet.</p>
      ) : (
        areaOrder.map(area => {
          const areaReservations = groupedReservations[area] || [];

          // Calculate used and available slots
          const usedSlots = areaReservations.map(res => res.timeSlot);
          const availableSlots = timeSlots.filter(slot => !usedSlots.includes(slot));
          const slotsLeft = availableSlots.length;

          return (
            <div key={area}>
              <h3 style={{
                background: '#00703c',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '6px',
                margin: '30px 0 10px',
                fontSize: '20px',
                fontWeight: '600'
              }}>
                {area} — {slotsLeft} slot{slotsLeft !== 1 ? 's' : ''} left
              </h3>

              {areaReservations.length === 0 ? (
                <p className="empty-message">No reservations yet for this area.</p>
              ) : (
                <div className="reservation-list">
                  {areaReservations.map((res, index) => {
                    const globalIndex = reservations.findIndex(r =>
                      r.name === res.name &&
                      r.email === res.email &&
                      r.area === res.area &&
                      r.timeSlot === res.timeSlot
                    );

                    return (
                      <div key={globalIndex} className="reservation-card">
                        <div className="reservation-details">
                          <h3>{res.name}</h3>
                          <p><strong>Email:</strong> {res.email}</p>
                          <p><strong>Area:</strong> {res.area}</p>
                          <p><strong>Time Slot:</strong> {res.timeSlot}</p>
                        </div>
                        <div className="reservation-actions">
                          <button className="edit-btn" onClick={() => onEdit(globalIndex)}>Edit</button>
                          <button className="delete-btn" onClick={() => onDelete(globalIndex)}>Delete</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ReservationList;
