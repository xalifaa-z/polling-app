import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestion } from "../features/questions/questionsSlice";
import { useNavigate } from "react-router-dom";

function AddPoll() {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authUser.id,
      })
    );
    navigate("/");
  };

  return (
    <div className="add-poll">
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Option One"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Option Two"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPoll;
