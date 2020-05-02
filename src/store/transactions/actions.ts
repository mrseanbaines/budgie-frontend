import { Dispatch } from 'redux'
import ky from 'ky'
import { addMonths } from 'date-fns'

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

export const fetchTransactions = (fromDate: string) => async (dispatch: Dispatch) => {
  const query = new URLSearchParams({
    since: new Date(fromDate).toISOString(),
    before: new Date(addMonths(new Date(fromDate), 1)).toISOString(),
  })

  try {
    dispatch(fetchRequest())

    const accessToken = sessionStorage.getItem('token')
    const { REACT_APP_API_URL } = process.env

    const response = await ky.get(`${REACT_APP_API_URL}/transactions?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      dispatch(fetchFailure())
      return
    }

    dispatch(fetchSuccess(json))
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchTransactionsSummaries = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchSummariesRequest())

    const { REACT_APP_API_URL } = process.env

    const response = await ky.get(`${REACT_APP_API_URL}/transactions/summary`)

    const json = await response.json()

    if (!response.ok) {
      dispatch(fetchSummariesFailure())
      return
    }

    dispatch(fetchSummariesSuccess(json))
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTransaction = (transactionId: string, categoryId: string | null) => async (dispatch: Dispatch) => {
  const { REACT_APP_API_URL } = process.env

  try {
    dispatch(updateRequest())

    const response = await ky.put(`${REACT_APP_API_URL}/transactions/${transactionId}`, {
      json: { category: categoryId },
    })

    const json = await response.json()

    if (!response.ok) {
      dispatch(updateFailure())
      return
    }

    dispatch(updateSuccess(json))
  } catch (error) {
    throw new Error(error)
  }
}
