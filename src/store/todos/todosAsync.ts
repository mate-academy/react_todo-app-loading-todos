import { createAsyncThunk } from '@reduxjs/toolkit';
import Todo, { TodoUpdateData } from 'models/Todo';
import { HttpClient } from 'utilities/HttpClient';

const endpoint = '/todos';

const TodosAsync = {
  // Fetch todos
  fetchTodos: createAsyncThunk('todos/fetchTodos', async (userId: number) => {
    const todos = await HttpClient.get<Todo[]>(`${endpoint}?userId=${userId}`);

    return todos;
  }),
  // Create todo
  createTodo: createAsyncThunk(
    'todos/createTodo',
    async (data: Omit<Todo, 'id'>) => {
      const todo = await HttpClient.post(`${endpoint}`, data);

      return todo as Todo;
    },
  ),
  // Update todo
  updateTodo: createAsyncThunk(
    'todos/updateTodo',
    async (data: TodoUpdateData) => {
      const { id, ...nextData } = data;
      const todo = await HttpClient.patch(`${endpoint}/${id}`, nextData);

      return todo as Todo;
    },
  ),
  // Delete todo
  deleteTodo: createAsyncThunk('todos/deleteTodo', async (todoId: number) => {
    await HttpClient.delete(`${endpoint}/${todoId}`);
  }),
};

export default TodosAsync;
