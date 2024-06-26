import React, { useEffect, useState } from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { addIncomeTransactionAndFetch, fetchIncomes, deleteIncomeTransactionAndFetch} from '../../../redux/incomeSlice'
import moment from 'moment'

const StyledIcon = styled(FontAwesomeIcon)`
  color: #2e2e2e;
`;

const AddIncome = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch();
  const {incomeTransaction, loading, error, totalAmt} = useSelector(state => state.income)

  const transactionHandle = async (e) => {
    e.preventDefault();
    dispatch(addIncomeTransactionAndFetch(title, amount))
    setAmount('')
    setDate('')
    setTitle('')
  }
  
  useEffect(() => {
    dispatch(fetchIncomes())
  }, [dispatch])

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: ${error}</div>
  }
  return (
    <div className="main-container">
      <div className="income-container">

        <div className="income-title">
          <h1>Incomes</h1>
        </div>

        <div className="income-total">
          <h1><span>{`Total Income: ${totalAmt}`}</span></h1>
        </div>

        <div className="income-main">

          <div className="income-input">
            <input type="text" placeholder="Income Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Income Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={transactionHandle}>Add Income</button>
          </div>

          <div className="income-output">

            {
              incomeTransaction.map((item) => (
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

                    <button onClick={() => dispatch(deleteIncomeTransactionAndFetch(item._id))}><StyledIcon icon={faTrash} /></button>

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

export default AddIncome