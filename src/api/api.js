import { v4 as uuidv4 } from "uuid";
import moment from "moment";
const getRandomizer = (bottom, top) => {
  return () => {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
  };
};

const calcRewards = (purchaseP) => {
  let points = 0;
  for (let i = 0; i < purchaseP; i++) {
    let currentPrice = i;
    if (currentPrice <= 100 && currentPrice >= 50) {
      points += 1;
    } else if (currentPrice > 100) {
      points += 2;
    }
  }
  return points;
};

const getAllTransactions = (name) => {
  let price = getRandomizer(0, 500);
  let randomNumber = getRandomizer(0, 99);
  let monthlyPoints = 0;
  let number = randomNumber();
  let date = "";
  let userData = {
    name: name,
    transactionData: [],
    transactionByMonth: {},
    monthlyPoints: monthlyPoints,
  };
  for (let i = 0; i < 90; i++) {
    date = moment()
      .startOf("month")
      .subtract(i + 1, "d")
      .endOf("day")
      .format("MMMM Do YY");

    if (number === i) {
      continue;
    } else {
      let purchasePrice = price();
      let dailyPoints = calcRewards(purchasePrice);

      let dailyData = {
        id: uuidv4(),
        amount: {
          price: purchasePrice,
          points: dailyPoints,
        },
        date: date,
      };
      userData.transactionData.push(dailyData);
    }
    for (let i = 0; i < userData.transactionData.length; i++) {
      let month = userData.transactionData[i].date.split(" ")[0];
      if (!userData.transactionByMonth[month]) {
        userData.transactionByMonth[month] = [userData.transactionData[i]];
      } else if (
        userData.transactionByMonth[month] &&
        userData.transactionData[i].date === date
      ) {
        userData.transactionByMonth[month].push(userData.transactionData[i]);
      }
    }
  }
  for (let i = 0; i < userData.transactionData.length; i++) {
    let points = userData.transactionData[i].amount.points;
    monthlyPoints += points;
  }
  userData.monthlyPoints = monthlyPoints;
  console.log(userData)

  return new Promise((resolve, reject) => {
    resolve(userData, Math.random() * 2000);
  });
};

export default getAllTransactions;
