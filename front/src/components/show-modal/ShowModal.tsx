import React from 'react';
import './show-modal.css';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { MainStateType } from '../../state/main-reducer';

const ShowModal = () => {
  const mainInfo = useSelector<RootStateType>((state) => {
    state.mainInfo
  });

  return <div>ShowModal</div>;
};

export default ShowModal;
