import { Todo } from "../types/Todo";
import { Sort } from "../types/Sort";

export function filterTodos(todos: Todo[], sortType: Sort) {
  let newTodo = [...todos];
  
  switch (sortType) {
    case Sort.Active:
      return newTodo.filter(todo => !todo.completed);
    case Sort.Completed:
      return newTodo.filter(todo => todo.completed);
    default:
      return newTodo;
  }
}
