import { Dispatch } from 'redux'
import ky from 'ky'
import { addMonths } from 'date-fns'

import { Transaction } from './types'

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} from './constants'

interface SuccessPayload {
  items: Transaction[]
  total: number
}

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export const fetchSuccess = (payload: SuccessPayload) => ({
  type: FETCH_SUCCESS,
  payload,
})

export const fetchFailure = () => ({
  type: FETCH_FAILURE,
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

export const fetchTransactions = (accountId: string, fromDate: string) => async (dispatch: Dispatch) => {
  const query = new URLSearchParams({
    account_id: accountId,
    since: new Date(fromDate).toISOString(),
    before: new Date(addMonths(new Date(fromDate), 1)).toISOString(),
    'expand[]': 'merchant',
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

    if (response.status !== 200) {
      dispatch(fetchFailure())
      return
    }

    dispatch(fetchSuccess(json))
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTransaction = (transactionId: string, categoryId: any) => async (dispatch: Dispatch) => {
  const { REACT_APP_API_URL } = process.env

  try {
    dispatch(updateRequest())

    const response = await ky.put(`${REACT_APP_API_URL}/transactions/${transactionId}`, {
      json: { category: categoryId },
    })

    const json = await response.json()

    if (response.status !== 200) {
      dispatch(updateFailure())
      return
    }

    dispatch(updateSuccess(json))
  } catch (error) {
    throw new Error(error)
  }
}
