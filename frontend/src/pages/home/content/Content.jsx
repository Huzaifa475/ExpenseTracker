import react, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { fetchIncomes } from './../../../redux/incomeSlice.js';
import { fetchExpenses } from './../../../redux/expenseSlice.js';
import moment from 'moment'
import './styles.css'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
)

const Content = () => {
    const dispatch = useDispatch()
    const { incomeTransaction, loading: incomeLoading, error: incomeError, totalAmt } = useSelector(state => state.income)
    const { expenseTransaction, loading: expenseLoading, error: expenseError, totalAmt: total } = useSelector(state => state.expense)
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [history, sethistory] = useState([]);

    useEffect(() => {
        dispatch(fetchIncomes());
        dispatch(fetchExpenses());
    }, [dispatch]);

    useEffect(() => {
        let transaction = [...incomeTransaction,...expenseTransaction]
        transaction.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt); })
        sethistory(transaction.slice(0, 6).map(({ content: title, amount: amt }) => ({ title, amt })));
        setIncomeData(incomeTransaction.map((item) => item.amount));
        setExpenseData(expenseTransaction.map((item) => item.amount));
    }, [incomeTransaction, expenseTransaction]);

    const data = {
        labels: incomeTransaction.map((inc) => moment(inc.createdAt).format('DD/MM/YYYY')),
        datasets: [
            {
                label: 'Incomes',
                data: incomeData,
                borderColor: '#2e2e2e',
                backgroundColor: '#2e2e2e',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: '#d1d1d1',
                backgroundColor: '#d1d1d1',
                tension: 0.2,
            }
        ]
    };

    if (incomeLoading || expenseLoading) {
        return <div>Loading...</div>;
    }

    if (incomeError || expenseError) {
        return <div>Error: {incomeError || expenseError}</div>;
    }
    return (
        <div className="home-page">

            <div className="content-container">

                <div className="left-container">

                    <div className="chart">
                        <ChartStyled >
                            <Line data={data} />
                        </ChartStyled>
                    </div>

                    <div className="amounts">

                        <div className="income-amount">
                            <span>{`Total Income: $${totalAmt}`}</span>
                        </div>
                        <div className="expense-amount">
                            <span>{`Total Expense: $${total}`}</span>
                        </div>
                        <div className="total-amount">
                            <span>{`Total: $${totalAmt - total}`}</span>
                        </div>

                    </div>

                </div>
                <div className="right-container">
                    <div className="history-title">
                        <h1>Recent History</h1>
                    </div>
                    <div className="history">
                        {
                            history.map((item, index) => (
                                <div className="history-container" key={index}>
                                    <div className="history-content">
                                        <h1>{item.title}</h1>
                                    </div>
                                    <div className="history-amount">
                                        <h1>{item.amt}</h1>
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

const ChartStyled = styled.div`
  background: white;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  margin: 0 auto;
  height: 100%;
`;

export default Content