import { Dispatch } from 'redux'
import { addMonths } from 'date-fns'

import { State } from 'store'
import { getAuthHeaders, api } from 'utils'

import { Transaction, TransactionSummary } from './types'

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  FETCH_SUMMARIES_REQUEST,
  FETCH_SUMMARIES_SUCCESS,
  FETCH_SUMMARIES_FAILURE,
} from './constants'

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export interface FetchSuccessPayload {
  items: Transaction[]
  total: number
}

export const fetchSuccess = (payload: FetchSuccessPayload) => ({
  type: FETCH_SUCCESS,
  payload,
})

export const fetchFailure = () => ({
  type: FETCH_FAILURE,
})

export const fetchSummariesRequest = () => ({
  type: FETCH_SUMMARIES_REQUEST,
})

export interface FetchSummariesSuccessPayload {
  items: TransactionSummary[]
}

export const fetchSummariesSuccess = (payload: FetchSummariesSuccessPayload) => ({
  type: FETCH_SUMMARIES_SUCCESS,
  payload,
})

export const fetchSummariesFailure = () => ({
  type: FETCH_SUMMARIES_FAILURE,
})

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = (payload: Transaction) => ({
  type: UPDATE_SUCCESS,
  payload,
})

export const updateFailure = () => ({
  type: UPDATE_FAILURE,
})

export const fetchTransactions = (fromDate: string) => async (dispatch: Dispatch, getState: () => State) => {
  const query = new URLSearchParams({
    since: new Date(fromDate).toISOString(),
    before: new Date(addMonths(new Date(fromDate), 1)).toISOString(),
  })

  try {
    dispatch(fetchRequest())

    const res = await api.get(`transactions?${query}`, { headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(fetchFailure())
      return
    }

    dispatch(fetchSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchTransactionsSummaries = () => async (dispatch: Dispatch, getState: () => State) => {
  try {
    dispatch(fetchSummariesRequest())

    const res = await api.get('transactions/summary', { headers: getAuthHeaders(getState) })
    const data = await res.json()

    if (!res.ok) {
      dispatch(fetchSummariesFailure())
      return
    }

    dispatch(fetchSummariesSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateTransaction = (transactionId: string, categoryId: string | null) => async (
  dispatch: Dispatch,
  getState: () => State,
) => {
  try {
    dispatch(updateRequest())

    const res = await api.put(`transactions/${transactionId}`, {
      json: { category: categoryId },
      headers: getAuthHeaders(getState),
    })

    const data = await res.json()

    if (!res.ok) {
      dispatch(updateFailure())
      return
    }

    dispatch(updateSuccess(data))
  } catch (error) {
    console.error(error)
  }
}
