import React from 'react';

const ModalConfirm = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h4>{message}</h4>
        <div className="modal-actions">
          <button onClick={onConfirm}>yes</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
