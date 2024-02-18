import React from 'react';
import { TodoInput } from './TodoInput';

export const Header: React.FC = () => (
  <div className="header">
    <h1 className="todoapp__title">todos</h1>
    <TodoInput />
  </div>
);
