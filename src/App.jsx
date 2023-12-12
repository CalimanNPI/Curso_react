import { useState, useEffect } from "react";
import "./App.css";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

function App() {
  const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 });
  const [alls, setAlls] = useState(0);
  const [average, setAverage] = useState(0.0);
  const [positive, setPositive] = useState(0.0);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});
  const [paginate, setPaginate] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);

  const handleClick = (name, value) => {
    setClicks({ ...clicks, [name]: value + 1 });
    setAlls(alls + 1);
    promedio();
    posi();
  };

  const capitalize = (t) => {
    return t[0].toUpperCase() + t.substr(1);
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * (anecdotes.length - 1));
  };

  const setArrayAnecdotes = () => {
    setPoints(new Uint16Array(anecdotes.length));
  };

  const setVote = async (id, value) => {
    setPoints({ ...points, [id]: value + 1 });
    await viewVotes();

    console.log(points);
  };

  const previous = (value) => {
    setPaginate(value - 1);
  };

  const next = (value) => {
    setPaginate(value + 1);
  };

  const promedio = () => setAverage(alls / 3);

  const posi = () => setPositive(clicks.good * (33 / 100));

  const viewVotes = async () => {
    let max = 0;
    let keys = 0;
    for (const key in points) {
      if (points[key] >= max) {
        max = points[key];
        keys = key;
      }
    }

    setMostVotes(keys);
  };

  useEffect(() => {
    setSelected(getRandomInt());
    setArrayAnecdotes();
  }, []);

  return (
    <>
      <div>
        <Text title="Anecdotes" text={anecdotes[paginate]} />

        <div className="btnv">
          {paginate > 0 && (
            <Buutton
              handleEvent={() => previous(paginate)}
              text="Previous anecdote"
            />
          )}
          <Buutton
            handleEvent={() => setVote(paginate, points[paginate])}
            text="Vote"
          />

          {paginate < anecdotes.length - 1 && (
            <Buutton handleEvent={() => next(paginate)} text="Next anecdote" />
          )}
        </div>

        <div className="votes">
          <Text title="Anecdote with most votes" text="" />
          <Text title="Anecdote" text={anecdotes[mostVotes]} />
        </div>
      </div>

      <Text title="Anecdotes" text={anecdotes[selected]} />
      <h1>GIVE FEEDBACK</h1>

      <div className="btns">
        <Buutton
          handleEvent={() => handleClick("good", clicks.good)}
          text="Good"
        />
        <Buutton
          handleEvent={() => handleClick("neutral", clicks.neutral)}
          text="Neutral"
        />
        <Buutton
          handleEvent={() => handleClick("bad", clicks.bad)}
          text="Bad"
        />
      </div>

      <div className="list">
        <h1>STATISTICS</h1>
        {alls ? (
          <>
            <Text title="Good" text={clicks.good} />
            <Text title="Neutral" text={clicks.neutral} />
            <Text title="Bad" text={clicks.bad} />
            <Text title="Alls" text={alls} />
            <Text title="Average" text={average} />
            <Text title="Positive" text={positive} />
          </>
        ) : (
          <Text title="No feedback given" text="" />
        )}
      </div>
    </>
  );
}

const Buutton = (props) => {
  const { handleEvent, text } = props;
  return <button onClick={handleEvent}>{text}</button>;
};

const Text = (props) => {
  const { title, text } = props;
  return (
    <h3>
      {title}: {text}
    </h3>
  );
};

export default App;
