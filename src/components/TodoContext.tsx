/* eslint-disable */
import React, {
  Dispatch,
  useEffect,
  useReducer,
} from "react";
import { Todo } from "../types/Todo";
import { getTodos } from '../api/todos';
import { FILTER, ACTIONS } from '.././utils/enums';

const USER_ID = 11384;

type Action = { type: ACTIONS.SORT, payload: string }
  | { type: ACTIONS.SET_LIST, payload: Todo[] }
  | { type: ACTIONS.SET_LENGTH, payload: number }
  | { type: ACTIONS.SET_ERROR, payload: string }

interface Data {
  list: Todo[],
  sortBy: string,
  totalLength: number,
  error: string,
};

type State = [
  state: Data,
  dispatch: Dispatch<Action>,
];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SORT:
      return [
        {
          ...state[0],
          sortBy: action.payload,
        },
        () => { }
      ];
    case ACTIONS.SET_LIST:
      return [
        {
          ...state[0],
          list: action.payload,
        },
        () => { }
      ];
    case ACTIONS.SET_ERROR:
      return [
        {
          ...state[0],
          error: action.payload,
        },
        () => { }
      ];
    case ACTIONS.SET_LENGTH:
      return [
        {
          ...state[0],
          totalLength: state[0].list.length,
        },
        () => { }
      ];
    default:
      return state;
  }
}

const initialState: State = [
  {
    list: [],
    sortBy: 'All',
    totalLength: 0,
    error: '',
  },
  () => { },
];

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => {
        dispatch({ type: ACTIONS.SET_LIST, payload: res })
        // dispatch({ type: ACTIONS.SET_LENGTH, payload: res.length })
      })
      .catch(() => dispatch({ type: ACTIONS.SET_ERROR, payload: 'Can`t load the page' }))
  }, []);

  function filteredTodos(): Todo[] {
    switch (state[0].sortBy) {
      case FILTER.ALL:
        return [...state[0].list];
      case FILTER.COMPLETED:
        return state[0].list.filter(todo => todo.completed);
      case FILTER.ACTIVE:
        return state[0].list.filter(todo => !todo.completed);
      default:
        return state[0].list;
    }
  }

  return (
    <StateContext.Provider value={[{
      ...state[0],
      list: filteredTodos(),
    }, dispatch]}>
      {children}
    </StateContext.Provider>
  )

}





