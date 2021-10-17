import {IFacility} from '../types/facility';

export type StackParamList = {
  Home: {
    facility: IFacility;
    active: boolean;
  };

  Activation: {
    active: boolean;
  };
};
