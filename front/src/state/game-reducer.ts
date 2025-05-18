
export enum GameReducerEnumType {
    CREATENEWDECK = "CREATENEWDECK",

}

export const CreateNewDeckActionType = {
    type: GameReducerEnumType.CREATENEWDECK,

}

export type GameReducerActionType = '';

export type GameReducerStateType = {
    
}

const initialState = {

}


export const gameReducer = (state: GameReducerStateType = initialState, action: GameReducerActionType) => {
    switch(action) {
        default:
            return state;
    } 
}

