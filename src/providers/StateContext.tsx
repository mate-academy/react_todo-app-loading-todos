import { createContext, Dispatch, useReducer } from 'react';

import { IState } from '../types/State.interface';
import { IAction } from '../types/Action.interface';
import { EAction } from '../types/Action.enum';
import { EFilterBy } from '../types/FilterBy.enum';
import {
  setUserReducer,
  setTodosReducer,
  addTodoReducer,
  editTodoReducer,
  deleteTodoReducer,
  setFilterReducer,
  setAnimationsReducer,
  setErrorReducer,
  setLoaderReducer,
  onAllLoadersReducer,
  offAllLoadersReducer,
} from './reducers';

type Reducer = (state: IState, action: IAction) => IState;

const actionReducer: Reducer = (state, action) => {
  switch (action.type) {
    case EAction.SET_USER:
      if (!action.user) {
        return state;
      }

      return setUserReducer(state, action.user);
    case EAction.SET_TODOS:
      if (!action.todos) {
        return state;
      }

      return setTodosReducer(state, action.todos);
    case EAction.ADD_TODO:
      if (!action.todo) {
        return state;
      }

      return addTodoReducer(state, action.todo);
    case EAction.EDIT_TODO:
      if (!action.todo) {
        return state;
      }

      return editTodoReducer(state, action.todo);
    case EAction.DELETE_TODO:
      if (!action.deleteId) {
        return state;
      }

      return deleteTodoReducer(state, action.deleteId);
    case EAction.SET_FILTER:
      if (!action.filterBy) {
        return state;
      }

      return setFilterReducer(state, action.filterBy);
    case EAction.SET_ANIMATIONS:
      if (!action.animations) {
        return state;
      }

      return setAnimationsReducer(state, action.animations);
    case EAction.SET_ERROR:
      if (!action.error) {
        return state;
      }

      return setErrorReducer(state, action.error);
    case EAction.SET_LOADER:
      if (!action.loader) {
        return state;
      }

      return setLoaderReducer(state, action.loader);
    case EAction.ON_ALL_LOADERS:
      return onAllLoadersReducer(state);
    case EAction.OFF_ALL_LOADERS:
      return offAllLoadersReducer(state);
    default:
      return state;
  }
};

const intialState: IState = {
  user: null,
  todos: [],
  loaders: [],
  animations: [],
  error: {
    message: '',
    show: false,
  },
  filterBy: EFilterBy.ALL,
};

export const DispatchContext = createContext<Dispatch<IAction>>(
  () => {},
);
export const StateContext = createContext(intialState);

type Props = {
  children: React.ReactNode;
};

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, intialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
