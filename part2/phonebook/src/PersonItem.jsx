
const PersonItem = ({name, number, onClick}) => {
  return (
    <div>
      <li>{name} {number}</li>
      <button onClick={onClick}>delete</button>
    </div>
  )
}

export default PersonItem