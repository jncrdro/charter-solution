import { useEffect, useState } from "react";
import Data from "./Data";
import getAllTransactions from "./api/api";

const Form = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const generateData = (name) => {
    fetch(`http://localhost:3000/`).then(() => {
      getAllTransactions(name).then((res) => setData(res));
    });
  };
  useEffect(() => {
    if (name) {
      generateData();
    }
  }, []);

  const handleChange = (ev) => {
    setName(ev.target.value);
  };

  const handleClick = (ev) => {
    generateData(name);
  };

  return (
    <>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <label>
          Name:{" "}
          <input type="text" value={name} onChange={handleChange}></input>
          <button value={name} onClick={handleClick}>
            Submit
          </button>
        </label>
      </form>
      {data !== null && name === data.name ? (
        <Data data={data} />
      ) : (
        <div>Here</div>
      )}
    </>
  );
};

export default Form;
