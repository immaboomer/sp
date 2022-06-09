import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [dList, setDList] = useState([]);
  axios.get("http://localhost:3001/hello").then((e) => setDList(e.data));
  const subData = () => {
    axios
      .post("http://localhost:3001/createStudent", { roll, name })
      .then((e) => {
        var datas = dList;
        datas.push({ roll, name });
        setDList(datas);
        setName("");
        setRoll("");
      });
  };
  const handleDelete = (roll) => {
    console.log(roll);
    axios.post("http://localhost:3001/deleteStudent", { roll }).then((e) => {
      var datas = dList;
      datas = datas.filter((e) => e.rollNo !== roll);
      console.log(datas);
    });
  };
  useEffect(() => {}, []);
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Roll Number"
          onChange={(e) => setRoll(e.target.value)}
          value={roll}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={() => subData()}>Add</button>
      </div>
      <div>
        {dList &&
          dList.map((e) => (
            <div key={e.rollNo}>
              {e.stuName}
              {e.rollNo}
              <button onClick={() => handleDelete(e.rollNo)}>delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
