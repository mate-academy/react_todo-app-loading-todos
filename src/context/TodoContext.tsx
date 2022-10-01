import {
  ChangeEvent, createContext, ReactNode, useState,
} from 'react';
import { Todo } from '../types/Todo';

interface Context {
  filtredTodos: Todo[],
  setFiltredTodos: (value: Todo[]) => void,
  inputValue: string,
  setInputValue: (value: string) => void,
  handleStatusChange: (todo: Todo, type: string) => void,
  todos: Todo[],
  setTodos: (value: Todo[]) => void,
  selectedTodoId: number | null,
  setSelectedTodoId: (value: number | null) => void,
  handleFilter: (filterStatus: string) => void,
  filterState: string,
  setFilterState: (value: string) => void,
  handleChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const TodoContext = createContext<Context>({
  filtredTodos: [],
  setFiltredTodos: () => undefined,
  inputValue: '',
  setInputValue: () => undefined,
  handleStatusChange: () => undefined,
  todos: [],
  setTodos: () => undefined,
  selectedTodoId: null,
  setSelectedTodoId: () => undefined,
  handleFilter: () => undefined,
  filterState: 'all',
  setFilterState: () => undefined,
  handleChangeTitle: () => undefined,
});

export function TodoProvider({ children }: { children?: ReactNode }) {
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filterState, setFilterState] = useState('all');

  const handleFilter = (filterStatus: string) => {
    let copyOfTodos = [...todos];

    setFilterState(filterStatus);

    if (filterStatus !== 'all') {
      copyOfTodos = copyOfTodos.filter(todo => {
        switch (filterStatus) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return false;
        }
      });
    }

    setFiltredTodos(copyOfTodos);
  };

  const handleStatusChange = (todo: Todo, type: string) => {
    const found = todos.find(stateTodo => stateTodo.id === todo.id) as Todo;

    const foundIndex = todos.findIndex(stateTodo => stateTodo.id === todo.id);

    switch (type) {
      case 'checkbox':
        found.completed = !found.completed;
        break;
      case 'title':
        setSelectedTodoId(null);
        found.title = inputValue;
        break;
      default:
        throw new Error('Error type');
    }

    const newTodos = todos.map((item, index) => {
      if (index === foundIndex) {
        return found;
      }

      return item;
    });

    setTodos(newTodos);
    handleFilter(filterState);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TodoContext.Provider value={{
      filtredTodos,
      setFiltredTodos,
      inputValue,
      setInputValue,
      handleStatusChange,
      todos,
      setTodos,
      selectedTodoId,
      setSelectedTodoId,
      handleFilter,
      filterState,
      setFilterState,
      handleChangeTitle,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
}
