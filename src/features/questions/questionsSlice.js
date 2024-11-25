import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _saveQuestion, _saveQuestionAnswer } from '../../_DATA';

export const saveQuestionAnswer = createAsyncThunk(
  'questions/saveQuestionAnswer',
  async (answerData) => {
    await _saveQuestionAnswer(answerData);
    return answerData;
  }
);

export const saveQuestion = createAsyncThunk(
  'questions/saveQuestion',
  async (questionData) => {
    const formattedQuestion = await _saveQuestion(questionData);
    return formattedQuestion;
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {},
  reducers: {
    setQuestions(state, action) {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state[action.payload.id] = action.payload;
        localStorage.setItem('questions', JSON.stringify(state));
      })
      .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
        const { qid, answer, authedUser } = action.payload;
        if (state[qid] && !state[qid][answer].votes.includes(authedUser)) {
          state[qid][answer].votes.push(authedUser);
          localStorage.setItem('questions', JSON.stringify(state));
        }
      });
  }
});

export const { setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer; 