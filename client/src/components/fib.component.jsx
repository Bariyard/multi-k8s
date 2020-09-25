import React, { useState, useEffect } from "react";
import axios from "axios";

function FibComponent() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const res = await axios.get("/api/values/current");
    setValues(res.data || {});
  };

  const fetchIndexes = async () => {
    const res = await axios.get("/api/values/all");
    setSeenIndexes(res.data || []);
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  },[]);

  const renderSeenIndexes = () => {
    return seenIndexes.length > 0 ? seenIndexes.map(({ number }) => number + ", ") : '0';
  };

  const renderValue = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For Index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index: index,
    });

    setIndex("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Enter Your Index</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <br />
      <h3>Indexes i have seen: </h3>
      <div>{renderSeenIndexes()}</div>

      <h3>Calculated Values: </h3>
      <div>{renderValue()}</div>
    </div>
  );
}

export default FibComponent;
