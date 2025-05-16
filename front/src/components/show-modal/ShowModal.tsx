import React from 'react';
import './show-modal.css';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { ChangeModalAC, MainStateType } from '../../state/main-reducer';
import { useDispatch } from 'react-redux';

const ShowModal = () => {
  const dispatch = useDispatch();
  const mainInfo = useSelector<RootStateType, MainStateType>(
    (state) => state.mainInfo
  );

  if (mainInfo.modal === 'none') return null;

  const handleClose = (e: any) => {
    if (e.target === e.currentTarget) dispatch(ChangeModalAC('none'));
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card">
        <h2 className="modal-title">How would you like to play?</h2>

        <button className="modal-btn" onClick={() => {}}>
          Play with account
        </button>

        <button className="modal-btn register" onClick={() => {}}>
          Register
        </button>

        <button className="modal-btn anonym" onClick={() => {}}>
          Play anonymously
        </button>
      </div>
    </div>
  );
};

export default ShowModal;
