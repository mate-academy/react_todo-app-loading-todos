import { Dispatch } from 'react';
import { type ContextType } from '../components/TodoContext';
import { Action } from './Action';

export type AppContextType = {
  state: ContextType;
  dispatch: Dispatch<Action>;
};
