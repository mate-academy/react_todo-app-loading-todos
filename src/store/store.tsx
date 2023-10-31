import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Dispatchers } from '../types/enums/Dispatchers';
import { getTodos, addTodo } from '../api/todos';
import { Errors } from '../types/enums/Errors';

const USER_ID = 11806;

type Actions =
{ type: Dispatchers.Add; payload: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> }
| { type: Dispatchers.UpdateTitle; payload: Todo }
| { type: Dispatchers.ChangeStatus; payload: number }
| { type: Dispatchers.ChangeAllStatuses; payload: boolean }
| { type: Dispatchers.DeleteWithId; payload: number }
| { type: Dispatchers.DeleteComplited }
| { type: Dispatchers.Load };

interface State {
  todos: Todo[];
  dispatcher: (act: Actions) => void;
  errorType: Errors | null;
}

const initialState: State = {
  todos: [],
  dispatcher: () => [],
  errorType: null,
};

export const TodosContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode,
};

const localInitial: Todo[] = [];

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(localInitial);
  const [errorType, setErrorType] = useState<Errors | null>(null);

  const cleanError = () => {
    setTimeout(() => {
      setErrorType(null);
    }, 3000);
  };

  const reducer = async (state: Todo[], action: Actions) => {
    switch (action.type) {
      case Dispatchers.Load:
        try {
          const todosFromServer = await getTodos(USER_ID);

          setTodos(todosFromServer);
        } catch (error) {
          setErrorType(Errors.GET);
          cleanError();
        }

        break;

      case Dispatchers.Add:
        try {
          const newTodo = await addTodo(action.payload);

          setTodos([
            ...state,
            newTodo,
          ]);
        } catch (error) {
          setErrorType(Errors.POST);
          cleanError();
        }

        break;

      case Dispatchers.DeleteComplited:
        setTodos([...state].filter(todo => !todo.completed));
        break;

      case Dispatchers.DeleteWithId:
        setTodos([...state].filter(todo => todo.id !== action.payload));
        break;

      case Dispatchers.ChangeStatus: {
        const updatedStatusTodo = [...state].map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        });

        setTodos(updatedStatusTodo);
      }

        break;

      case Dispatchers.UpdateTitle: {
        const { title, id } = action.payload;

        const updatedTitleTodo = [...state].map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
            };
          }

          return todo;
        });

        setTodos(updatedTitleTodo);
      }

        break;

      case Dispatchers.ChangeAllStatuses:
        setTodos([...state].map(todo => {
          return {
            ...todo,
            completed: action.payload,
          };
        }));
        break;

      default:
        break;
    }
  };

  const dispatcher = (action: Actions) => {
    return reducer(todos, action);
  };

  useEffect(() => {
    reducer(todos, { type: Dispatchers.Load });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodosContext.Provider value={{ todos, dispatcher, errorType }}>
      {children}
    </TodosContext.Provider>
  );
};
