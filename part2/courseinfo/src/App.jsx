import Course from "./Course";

const Header = ({ heading }) => {
  return <h2>{heading}</h2>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const TotalExercises = ({ parts }) => {
    const exercises = parts.reduce((acc, cur) => acc + cur.exercises, 0);

    return (
      <div>
        <h4>total of {exercises} exercises</h4>
      </div>
    );
  };

  return (
    <>
      <div>
        <h1>Web Development cirriculum</h1>
        <Header heading="Half stuck application development" />
        {courses[0].parts.map((course) => (
          <Course
            key={course.id}
            name={course.name}
            exercises={course.exercises}
          />
        ))}
        <TotalExercises parts={courses[0].parts} />
      </div>
      <div>
        <Header heading="Node.js" />
        {courses[1].parts.map((course) => (
          <Course
            key={course.id}
            name={course.name}
            exercises={course.exercises}
          />
        ))}
        <TotalExercises parts={courses[1].parts} />
      </div>
    </>
  );
};

export default App;
