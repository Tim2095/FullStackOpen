import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeed, setTotalFeed] = useState(0);
  const [average, setAverage] = useState(0);
  const [positivePr, setPositivePr] = useState(0);

  const countAverageAndPositive = () => {
    let av;
    totalFeed === 0 ? (av = 0) : (av = (good - bad) / totalFeed);
    setAverage(av);

    const positivePercentage = totalFeed === 0 ? 0 : (good / totalFeed) * 100;
    setPositivePr(positivePercentage);
  };

  const handleGoodHandler = () => {
    setGood((prev) => (prev += 1));
    setTotalFeed((prev) => (prev += 1));
    countAverageAndPositive();
  };
  const handleNeutralHandler = () => {
    setNeutral((prev) => (prev += 1));
    setTotalFeed((prev) => (prev += 1));
    countAverageAndPositive();
  };
  const handleBadHandler = () => {
    setBad((prev) => (prev += 1));
    setTotalFeed((prev) => (prev += 1));
    countAverageAndPositive();
  };

  const Header = () => {
    return <h1>Give Feedback</h1>;
  };

  const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  const Statistics = () => {
    return (
      <>
      {totalFeed === 0 && <p>No feed back given</p>}
        {totalFeed !== 0 && <div>
          <h2>Statistics</h2>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>total {totalFeed}</p>
          <p>average {average === 0 ? 0 : average}</p>
          <p>positive {positivePr} %</p>
        </div>}
      </>
    );
  };

  return (
    <div>
      <Header />
      <Button onClick={handleGoodHandler} text="good" />
      <Button onClick={handleNeutralHandler} text="neutral" />
      <Button onClick={handleBadHandler} text="bad" />
      <Statistics />
    </div>
  );
};

export default App;
