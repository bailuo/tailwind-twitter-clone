import { Action, createReducer, on } from '@ngrx/store'
import { User } from '@beehive/web/core/data-access'

import * as AuthActions from './auth.actions'

export const AUTH_FEATURE_KEY = 'auth'

export interface State {
  user?: User
  error?: string
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State
}

export const initialState: State = {}

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
)

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action)
}
