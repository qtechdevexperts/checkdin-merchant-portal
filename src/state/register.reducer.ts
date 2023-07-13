import { ActionType, GlobalStateInterface } from "../types/auth.type";

const RegisterReducer = (state: GlobalStateInterface, action: ActionType): any => {
    switch (action.type) {
        case 'SET_REGISTER_USER':
            return {
                ...state,
                formValues: action.payload,
            };
        default: 
            return state;
    }
}

export default RegisterReducer;