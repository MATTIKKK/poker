import React from 'react';
import './show-modal.css';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { ChangeModalAC, MainReducerStateType } from '../../state/main-reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShowModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainInfo = useSelector<RootStateType, MainReducerStateType>(
    (state) => state.mainInfo
  );

  if (mainInfo.modal === 'none') return null;

  const handleClose = (e: any) => {
    if (e.target === e.currentTarget) dispatch(ChangeModalAC('none'));
  };

  const handleNavigate = (path: string) => {
    dispatch(ChangeModalAC('none'));
    navigate(path)
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card">
        <h2 className="modal-title">How would you like to play?</h2>

        <button className="modal-btn" onClick={() => handleNavigate('/login')}>
          Play with account
        </button>

        <button className="modal-btn register-button" onClick={() => handleNavigate('register')}>
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
