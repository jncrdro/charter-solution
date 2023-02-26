import { useEffect, useState } from "react";
import { useGenerateData } from "../../tools/generateData";
import "./UserData.css";
import getAllTransactions from "../../api/api";

const UserData = ({ currentName }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTransactions = async (currentName) => {
      const result = await getAllTransactions(currentName);
      return setData(result);
    };
    getTransactions(currentName);
  }, [currentName]);
  
  let displayData;
  if (data.length) {
    console.log(data[0])
    const {
      name,
      pointsByMonth,
      totalPoints,
      transactionByMonth,
      transactionData,
    } = data[0];
    displayData = (
      <section className="data">
        <>
          {name} has {totalPoints} points from the past 3 months
        </>
        <ul>
          {pointsByMonth.map((currentMonthObj) => {
            let points, currentMonth;
            for (let month in currentMonthObj) {
              currentMonth = month;
              points = currentMonthObj[month];
            }
            return (
              <li key={currentMonth} className="byMonth">
                {currentMonth} {points}
              </li>
            );
          })}
        </ul>
        <ul className="dataBody">
          {transactionData?.map((transaction) => (
            <li key={transaction.id} className="transaction">
              <div>Date: {transaction.date}</div>
              <div>Price: ${transaction.amount.price}</div>
              <div>Points: {transaction.amount.points}</div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return data.length ? displayData : <>Loading...</>;

  // return null;
};

export default UserData;
