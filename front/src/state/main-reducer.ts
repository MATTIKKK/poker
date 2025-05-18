
export type ModalType = 'start' | 'none';

export enum MainReducerEnumType {
    CHANGEMODALTYPE = "CHANGEMODALTYPE",
}

export type ChangeModalActionType = {
    type: MainReducerEnumType.CHANGEMODALTYPE;
    modal: ModalType;
}

type MainReducerActionType = ChangeModalActionType;

export type MainReducerStateType = {
    modal: ModalType;
}   

const initialState: MainReducerStateType = {
    modal: 'none',
}
export const mainReducer = (state: MainReducerStateType = initialState, action: MainReducerActionType) => {
  switch (action.type) {
    case MainReducerEnumType.CHANGEMODALTYPE:
        return {...state, modal: action.modal}
    default:
      return state;
  }
};

export const ChangeModalAC = (modal: ModalType): ChangeModalActionType => {
    return {
        type: MainReducerEnumType.CHANGEMODALTYPE,
        modal
    }
}