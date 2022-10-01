import {
  ChangeEvent, createContext, ReactNode, useState,
} from 'react';
import { Todo } from '../types/Todo';

export enum Filter {
  all,
  active,
  completed,
}

export enum TypeChange {
  title,
  checkbox,
}

interface Context {
  filtredTodos: Todo[],
  setFiltredTodos: (value: Todo[]) => void,
  inputValue: string,
  setInputValue: (value: string) => void,
  handleStatusChange: (todo: Todo, type: TypeChange) => void,
  todos: Todo[],
  setTodos: (value: Todo[]) => void,
  selectedTodoId: number | null,
  setSelectedTodoId: (value: number | null) => void,
  handleFilter: (filterStatus: number) => void,
  filterState: Filter,
  setFilterState: (value: Filter) => void,
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
  filterState: Filter.all,
  setFilterState: () => undefined,
  handleChangeTitle: () => undefined,
});

export function TodoProvider({ children }: { children?: ReactNode }) {
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filterState, setFilterState] = useState(Filter.all);

  const handleFilter = (filterStatus: number) => {
    let copyOfTodos = [...todos];

    setFilterState(filterStatus);

    if (filterStatus !== Filter.all) {
      copyOfTodos = copyOfTodos.filter(todo => {
        switch (filterStatus) {
          case Filter.active:
            return !todo.completed;
          case Filter.completed:
            return todo.completed;
          default:
            return false;
        }
      });
    }

    setFiltredTodos(copyOfTodos);
  };

  const handleStatusChange = (todo: Todo, type: TypeChange) => {
    const found = todos.find(stateTodo => stateTodo.id === todo.id) as Todo;

    const foundIndex = todos.findIndex(stateTodo => stateTodo.id === todo.id);

    switch (type) {
      case TypeChange.checkbox:
        found.completed = !found.completed;
        break;
      case TypeChange.title:
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
