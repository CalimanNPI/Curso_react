import { useState } from "react";

const CourseInfo = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const name = "Peter";
  const age = 20;

  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });

  const handleRightClick = () =>
    setClicks({ ...clicks, right: clicks.right + 1 });

  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const courses = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />

      <Courses courses={courses} />

      <Buutton handle={handleLeftClick} text={"Left"} />
      <Buutton handle={handleRightClick} text={"Right"} />
      {/*
      <p>Hello world</p>
      <Hello name={"Maya"} age={26 + 10} />
      <Hello name={name} age={age} />
      <CourseInfo />
      */}
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  );
};

const Courses = (props) => {
  const parts = props.courses.parts;
  let total = 0;

  return (
    <div>
      <h1>{props.courses.name}</h1>

      <div>
        {parts.map((item) => {
          total += item.exercises;

          return (
            <p>
              {item.name} {item.exercises}
            </p>
          );
        })}
      </div>

      <p>Number of exercises: {total}</p>
    </div>
  );
};

const Buutton = (props) => {
  const { handle, text } = props;
  return <button onClick={handle}>{text}</button>;
};

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

export default CourseInfo;
