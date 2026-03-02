/**
 * Component for rendering the list of Todo items
 */
 import React from 'react';
 import { Todo } from '../types/Todo';
 import { TodoItem } from './TodoItem';

 type Props = {
   todos: Todo[];
 };

 export const TodoList: React.FC<Props> = ({ todos }) => {
   return (
     <section className="todoapp__main" data-cy="TodoList">
       {/* Map through the filtered todos and render a TodoItem for each */}
       {todos.map(todo => (
         <TodoItem key={todo.id} todo={todo} />
       ))}
     </section>
   );
 };
