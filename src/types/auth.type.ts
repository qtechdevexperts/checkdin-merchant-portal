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
  // coupon_term: string;
  // discount_amount: string;
  // discount_type: string;
  // start_date: string;
  // end_date: string;
  // redeem_code: string;
  // coupon_type: string;
  chekdin_name: string;
  chekdin_start_date: string;
  chekdin_expiry_date: string;
  chekdin_offer_title: string;
  chekdin_offer_description: string;
  chekdin_url: string;
  chekdin_discount_type: string;
  chekdin_coupon_type: string;
  chekdin_discount_amount: string | number;
  view_name: string;
  view_url: string;
  view_offer_title: string;
  view_discount_type: string;
  view_coupon_type: string;
  view_discount_amount: string | number;
  chekdin_coupon_img_url: string;
  view_coupon_img_url: string;
}
