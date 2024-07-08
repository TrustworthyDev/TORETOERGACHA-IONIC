import { createStore, useStore as baseUseStore, Store } from 'vuex';

export const key = Symbol();
const state = {
    user: {},
    categories: []
};

export const store = createStore({ state });

// our own `useStore` composition function for types
export function useStore() {
    return baseUseStore(key);
}
