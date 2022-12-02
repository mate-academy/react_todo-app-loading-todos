import { createContext } from 'react';
import { ContextValue } from '../types/ContentValue';

export const AppContext = createContext<ContextValue>({} as ContextValue);
