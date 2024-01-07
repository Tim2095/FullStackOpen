import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allFeed = good + neutral + bad;
  let positive;
  let average;

  if (allFeed === 0) {
    average = 0;
    positive = 0;
  } else {
    average = (good - bad) / allFeed;
    positive = (good * 100) / allFeed;
  }

  const Button = ({ text, onSubmit }) => {
    return <button onClick={onSubmit}>{text}</button>;
  };

  const handleGoodFeed = () => {
    setGood((goodFd) => (goodFd += 1));
  };

  const handleNeutralFeed = () => {
    setNeutral((neutralFd) => (neutralFd += 1));
  };

  const handleBadFeed = () => {
    setBad((badFd) => (badFd += 1));
  };

  const FeedBackHandler = () => {
    return (
      <div>
        <h2>Give Feedback</h2>
        <Button text="good" onSubmit={handleGoodFeed} />
        <Button text="neutral" onSubmit={handleNeutralFeed} />
        <Button text="bad" onSubmit={handleBadFeed} />
      </div>
    );
  };

  const Statistic = ({ text, value }) => {
    return (
      <tr>
        <td>
          {text}: {text === 'Positive' ? value.toFixed(1) + ' %': text === 'Average' ? value.toFixed(2) : value}
        </td>
      </tr>
    );
  };

  const Statistics = () => {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={allFeed} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    );
  };

  return (
    <>
      <FeedBackHandler />
      {allFeed === 0 ? <p>No feedback given</p> : <Statistics />}
    </>
  );
};

export default App;
