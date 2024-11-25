import { createSlice } from '@reduxjs/toolkit';
import { saveQuestionAnswer, saveQuestion } from '../questions/questionsSlice';

const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    setUsers(state, action) {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveQuestion.fulfilled, (state, action) => {
        const { author, id } = action.payload;
        if (state[author]) {
          state[author].questions.push(id);
          localStorage.setItem('users', JSON.stringify(state));
        }
      })
      .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        if (state[authedUser]) {
          state[authedUser].answers[qid] = answer;
          localStorage.setItem('users', JSON.stringify(state));
        }
      });
  }
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer; 