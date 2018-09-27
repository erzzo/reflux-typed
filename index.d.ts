import * as React from 'react';

export as namespace Reflux;

export interface StoreDefinition {
  listenables?: any[];
  init?: Function;
  getInitialState?: Function;
  [propertyName: string]: any;
}

export interface ListenFn {
  (...params: any[]): any;
  completed: Function;
  failed: Function;
}
export interface Listenable {
  listen: ListenFn;
}

export interface Subscription {
  stop: Function;
  listenable: Listenable;
}

export interface ActionsDefinition {
  [index: string]: any;
}

export interface Actions {
  [index: string]: Listenable;
}

export let GlobalState: {
  initStore(store: any): void;
  setGlobalState(): void;
  getGlobalState(): {[store: string]: any};
  [store: string]: any
}

export class Store<T> {
  static id: string;
  constructor(args: any[]);
  listenables?: any[] | ActionsDefinition;
  state: T;
  hasListener(listenable: Listenable): boolean;
  listenToMany(listenables: Listenable[]): void;
  validateListening(listenable: Listenable): string;
  listenTo(listenable: Listenable, callback: Function, defaultCallback?: Function): Subscription;
  stopListeningTo(listenable: Listenable): boolean;
  stopListeningToAll(): void;
  fetchInitialState(listenable: Listenable, defaultCallback: Function): void;
  trigger(state: any): void;
  listen(callback: Function, bindContext: any): Function;
  setState(state: any): void;
}

export class Component<props, state, T> extends React.Component<props, state> {
  store: new() => Store<any>;
  stores: (new() => Store<any>)[];
  storeKeys: string[];
  state: any;
}

export function createActions(definitions: ActionsDefinition | string[]): any;
