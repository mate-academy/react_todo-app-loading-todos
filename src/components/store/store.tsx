import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Todo } from '../../types/Todo';
import { ProviderProps } from '../../types/ProviderProps';
import { FilterOption } from '../../enum/FilterOption';
import { useTodosFilter } from '../../helpers/useTodosFilter';

type TodosContextType = {
  todos: Todo[],
  addTodo: (newTodo: Todo) => void;
  removeTodo: (todoId: number) => void;
  recieveTodos: (newTodos: Todo[]) => void,
  setFilterSelected: (filter: FilterOption) => void,
  filterSelected: FilterOption,
  filteredTodos: Todo[],
  toggleTodoCondition: (todoId: number) => void,
};

const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  recieveTodos: () => {},
  setFilterSelected: () => {},
  filterSelected: FilterOption.All,
  filteredTodos: [],
  toggleTodoCondition: () => {},
});

export const TodosContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    filterSelected,
    setFilterSelected,
  ] = useState<FilterOption>(FilterOption.All);

  const recieveTodos = useCallback(
    (newTodos: Todo[]) => {
      setTodos(newTodos);
    },
    [],
  );

  const filteredTodos = useTodosFilter({ todos, filterSelected });

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const toggleTodoCondition = (todoId: number) => {
    // some time ago i can implement status for 'allToggleBtn'
    // and toggle 'todo.completed' based on that status 👀

    const findedTodo = todos.find(todo => todo.id === todoId) || null;

    if (!findedTodo) {
      return;
    }

    const newTodo = {
      ...findedTodo,
      completed: !findedTodo.completed,
    };

    const copyTodos = [...todos];
    const indexFindedTodo = copyTodos.indexOf(findedTodo);

    copyTodos[indexFindedTodo] = newTodo;

    setTodos(copyTodos);
  };

  const TodosProviderValue: TodosContextType = {
    todos,
    addTodo,
    removeTodo,
    recieveTodos,
    filteredTodos,
    filterSelected,
    setFilterSelected,
    toggleTodoCondition,
  };

  return (
    <TodosContext.Provider value={TodosProviderValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
