import Course from "./components/Course";
import Header from "./components/Header";

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
  const exercisesSum1 = courses[0].parts.reduce(
    (acc, item) => acc + item.exercises,
    0
  );
  const exercisesSum2 = courses[1].parts.reduce(
    (acc, item) => acc + item.exercises,
    0
  );


  return (
    <>
      <Header title={courses[0].name} />
      <div>
        {courses[0].parts.map((course) => (
          <Course
            key={course.id}
            name={course.name}
            amount={course.exercises}
          />
        ))}
        <h2>Total Exercise: {exercisesSum1}</h2>
      </div>
      <div>
      {courses[1].parts.map((course) => (
          <Course
            key={course.id}
            name={course.name}
            amount={course.exercises}
          />
        ))}
        <h2>Total Exercise: {exercisesSum2}</h2> 
      </div>
    </>
  );
};

export default App;
