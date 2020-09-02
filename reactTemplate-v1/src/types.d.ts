import { ThunkAction as _ThunkAction } from 'redux-thunk';
import { Reducers } from './store/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type ThunkAction<TAction> =
    | _ThunkAction<void, AppState, unknown, ActionTypes<TAction>>
    | Promise<_ThunkAction<Promise<void>, AppState, unknown, ActionTypes<TAction>>>;

  declare type Connect<TTypeOfMapStateToProps, TTypeOfMapDispatchToProps> = ReturnType<TTypeOfMapStateToProps> & TTypeOfMapDispatchToProps;

  declare type ValueOf<T> = T[keyof T];

  // Others
  declare type Timeout = NodeJS.Timeout;

  declare type StatusRequest = 'loading' | 'success' | 'failure';
  declare type MessageRequest = string;
  declare type Tail<T extends any[]> = ((...arg: T) => any) extends (_: any, ...tail: infer TT) => any ? TT : [];
}
