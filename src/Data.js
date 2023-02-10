import "./Data.css";

const Data = ({ data }) => {
  const { name, transactionData, transactionByMonth, monthlyPoints } = data;

  const byMonth = Object.entries(transactionByMonth).reduce((acc, [month, transactions]) => {
    let total = 0;
    let currentMonth = {}
    currentMonth[month] = total;
    for(let i = 0; i < transactions.length; i++){
      if (!acc[month]){
        total += transactions[i].amount.points;
        currentMonth[month] = total;
      } else {
        currentMonth[month] += transactions[i].amount.points;
      }
    }
    acc.push(currentMonth);
    return acc;
  }, [])

  return (
    <section className="data">
      <>{name} has {monthlyPoints} points from the past 3 months</>
      <ul>
        {byMonth.map((currentMonth) => {
          for(let key in currentMonth){
            return <li key={key} className="byMonth">{key} {currentMonth[key]}</li>;
          }
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
};

export default Data;
