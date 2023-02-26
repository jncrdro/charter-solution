import { useState } from "react";
import UserData from "../UserData/UserData";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [currentName, setCurrentName] = useState('')
  let bool = false
  const [isDataAvailable, setIsDataAvailable] = useState(bool);

  const handleChange = (ev) => {
    setName(ev.target.value);
  };

  const handleClick = () => {
    setIsDataAvailable(!bool);
    setCurrentName(name)
    setName('')
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          Name:{" "}
          <input type="text" value={name} onChange={handleChange}></input>
          <button value={name} onClick={handleClick}>
            Submit
          </button>
        </label>
      </form>
      {isDataAvailable && currentName !== "" ? <UserData currentName={currentName} /> : <>Input name for history</>}
    </>
  );
};

export default UserInfo;
