
export type ModalType = 'start' | 'none';

export enum MainEnumType {
    CHANGEMODALTYPE = "CHANGEMODALTYPE",
}

export type ChangeModalActionType = {
    type: MainEnumType.CHANGEMODALTYPE;
    modal: ModalType;
}

type MainActionType = ChangeModalActionType;

export type MainStateType = {
    modal: ModalType;
}   

const initialState: MainStateType = {
    modal: 'none',
}
export const mainReducer = (state: MainStateType = initialState, action: MainActionType) => {
  switch (action.type) {
    case MainEnumType.CHANGEMODALTYPE:
        return {...state, modal: action.modal}
    default:
      return state;
  }
};

export const ChangeModalAC = (modal: ModalType) => {
    return {
        type: MainEnumType,
        modal
    }
}