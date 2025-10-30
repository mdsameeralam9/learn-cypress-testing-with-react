// import { useSyncExternalStore, useRef } from 'react';

// // Simple external store
// const createStore = () => {
//   const UNSET = Symbol('unset');
//   let state = UNSET;
//   const listeners = new Set();

//   const setInitialValue = (value) => {
//     if (state !== UNSET) return;
//     state = typeof value === 'function' ? value() : value;
//   };

//   const setState = (value) => {
//     const next = typeof value === 'function' ? value(state === UNSET ? undefined : state) : value;
//     // Only notify if changed by Object.is semantics
//     if (Object.is(next, state)) return;
//     state = next;
//     // Notify subscribers
//     listeners.forEach((l) => l());
//   };

//   const subscribe = (listener) => {
//     listeners.add(listener);
//     return () => listeners.delete(listener);
//   };

//   const getSnapshot = () => (state === UNSET ? undefined : state);

//   // Optional SSR support:
//   // const getServerSnapshot = () => undefined;

//   return { setInitialValue, setState, subscribe, getSnapshot };
// };

// const store = createStore();

// const useMyState = (initialValue) => {
//   // Initialize only once per app lifetime
//   useRef(store.setInitialValue(initialValue));
//   const state = useSyncExternalStore(store.subscribe, store.getSnapshot /*, store.getServerSnapshot*/);
//   const setState = store.setState;
//   return [state, setState];
// };

// export default useMyState;



import { useRef, useSyncExternalStore } from 'react';

// Internal store factory for a single value
function createValueStore(initialValue) {
  let state = initialValue;
  const listeners = new Set();

  const setState = (updater) => {
    const next = typeof updater === 'function' ? updater(state) : updater;
    if (Object.is(next, state)) return;
    state = next;
    listeners.forEach(l => l());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => state;

  return { subscribe, getSnapshot, setState };
}

// Hook: like useState(initial), but global-safe and isolated per call
export function useMyState(initialValue) {
  // Create one store per hook call instance
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createValueStore(initialValue);
  }
  const store = storeRef.current;

  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const setValue = store.setState;

  return [value, setValue];
}

