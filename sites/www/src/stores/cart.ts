import { QueryClient } from '@tanstack/query-core';
import { atom } from 'nanostores';

export const cart = atom({});
export const client = new QueryClient();
