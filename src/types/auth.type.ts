import { Dispatch } from "react";

export interface RegisterConf {
  code: string;
}

export interface GlobalStateInterface {
  isUserAuthenticated: boolean;
  loggedUser: string;
  persistenceType: string;
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};

export interface RegisterValues {
  coupon_term: string;
  discount_amount: string;
  discount_type: string;
  start_date: string;
  end_date: string;
  redeem_code: string;
  coupon_type: string;
}
