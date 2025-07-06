import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import {
  addTodos,
  deleteTodo,
  getTodos,
  patchTodos,
  USER_ID,
} from './api/todos'; // USER_ID ainda é exportado para a verificação inicial
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FormTodo } from './components/FormTodos/FormTodo';

import { FooterTodos } from './components/FooterTodos';
import { ErrorTodos } from './components/ErrorTodos/ErrorTodos';

type Filter = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterSelect, setFilterSelected] = useState<Filter>('All');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Não foi possível carregar as tarefas.');
        // Não lançar o erro novamente, setError já lida com a exibição.
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filterSelect === 'Active') {
      return !todo.completed;
    }

    if (filterSelect === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  function postTodos(title: string) {
    if (title.trim().length === 0) {
      setError('O título não pode estar vazio.');

      return;
    }

    // Não é mais necessário passar userId
    addTodos({ title, completed: false })
      .then(newTodo => setTodos(prev => [...prev, newTodo]))
      .catch(() => {
        setError('Não foi possível adicionar a tarefa.');
      });
  }

  function removeTodos(todoId: number) {
    // Retorna a Promise para que chamadas subsequentes possam encadeá-la
    return deleteTodo(todoId)
      .then(() => getTodos()) // Recarrega todas as tarefas após a exclusão
      .then(setTodos)
      .catch(() => {
        setError('Não foi possível excluir a tarefa.');
      });
  }

  function changeTodo(todoId: number, title: string, completed: boolean) {
    // Não é mais necessário passar userId
    return patchTodos({ id: todoId, title, completed })
      .then(() => getTodos()) // Recarrega todas as tarefas após a alteração
      .then(setTodos)
      .catch(() => {
        setError('Não foi possível atualizar a tarefa.');
      });
  }

  function changeComplite() {
    const isAllCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    // Atualiza o estado local imediatamente para uma melhor experiência do usuário
    setTodos(updatedTodos);

    // Envia as atualizações para a API.
    // Garante que o patchTodos use o userId correto internamente.
    Promise.all(updatedTodos.map(todo => patchTodos(todo)))
      .then(() => getTodos()) // Recarrega para garantir consistência
      .then(setTodos)
      .catch(() => {
        setError('Não foi possível alterar o status de todas as tarefas.');
        // Considerar um rollback do estado local aqui se o erro for crítico
      });
  }

  function filter(type: Filter) {
    setFilterSelected(type);
  }

  function clearCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(() => getTodos()) // Recarrega as tarefas após a limpeza
      .then(setTodos)
      .catch(() => {
        setError('Não foi possível limpar as tarefas concluídas.');
      });
  }

  function clearError() {
    setError('');
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">tarefas</h1>

      <div className="todoapp__content">
        <FormTodo
          postTodos={postTodos}
          changeComplite={changeComplite}
          todos={todos}
        />

        {todos.length > 0 && ( // Condição única para ambos os componentes
          <>
            <TodoList
              todos={filteredTodos}
              deleteTodo={removeTodos}
              changeTodo={changeTodo}
            />

            <FooterTodos
              todos={todos}
              filter={filter}
              clearCompleted={clearCompleted}
              selected={filterSelect}
            />
          </>
        )}
      </div>

      <ErrorTodos error={error} clearError={clearError} />
    </div>
  );
};
