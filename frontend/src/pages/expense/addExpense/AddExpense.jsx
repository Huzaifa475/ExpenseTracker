import React, { useEffect, useState } from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {addExpenseTransactionAndFetch, fetchExpenses , deleteExpenseTransactionAndFetch} from '../../../redux/expenseSlice.js'
import {toast, Toaster} from 'react-hot-toast'
import moment from 'moment'

const StyledIcon = styled(FontAwesomeIcon)`
  color: #2e2e2e;
`;

const AddExpense = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch()
  const { expenseTransaction, loading, error , totalAmt} = useSelector(state => state.expense);
  
  const transactionHandle = (e) => {
    e.preventDefault();
    dispatch(addExpenseTransactionAndFetch(title, amount))
    setTitle('')
    setAmount('')
  }

  const transactionDelete = (transactionId) => {
    dispatch(deleteExpenseTransactionAndFetch(transactionId))
  }

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  if(loading){
    return <div>Loading</div>
  }

  if(error){
    return <div>Error :${error}</div>
  }
  return (
    <div className="main-container">
      <div className="expense-container">

        <div className="expense-title">
          <h1>Expenses</h1>
        </div>

        <div className="expense-total">
          <h1>{`Total Expense: ${totalAmt}`}</h1>
        </div>

        <div className="expense-main">

          <div className="expense-input">
            <input type="text" placeholder="Expense Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Expense Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={transactionHandle}>Add expense</button>
            <Toaster/>
          </div>

          <div className="expense-output">

            {
              expenseTransaction.map((item) => (
                <div className="transaction" key={item._id}>

                  <div className="transaction-container">

                    <div className="transaction-title">

                      <h1>{item.content}</h1>

                    </div>

                    <div className="transaction-container-title">

                      <h1 >{moment(item.createdAt).format('DD/MM/YYYY')}</h1>
                      <h1 >{item.amount}</h1>

                    </div>

                  </div>

                  <div className="transaction-container-button">

                    <button onClick={() => (transactionDelete(item._id))}><StyledIcon icon={faTrash} /></button>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  )
}

export default AddExpense