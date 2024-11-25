import { _saveQuestion, _saveQuestionAnswer } from '../../_DATA';
import { saveQuestion, saveQuestionAnswer } from './questionsSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  users: {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      answers: {},
      questions: []
    }
  },
  questions: {}
};

describe("Questions Slice", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    store.clearActions();
  });

  describe("saveQuestion", () => {
    it("should save a correctly formatted question", async () => {
      const question = {
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'sarahedo',
      };

      const savePromise = store.dispatch(saveQuestion(question));
      jest.runAllTimers();
      await savePromise;

      const actions = store.getActions();
      expect(actions[0].type).toBe('questions/saveQuestion/pending');
      expect(actions[1].type).toBe('questions/saveQuestion/fulfilled');
    });

    it("should handle errors for incorrectly formatted questions", async () => {
      const invalidQuestion = {
        optionOneText: '',
        optionTwoText: '',
        author: '',
      };

      const savePromise = _saveQuestion(invalidQuestion);
      jest.runAllTimers();
      await expect(savePromise).rejects.toBe(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });

  describe("saveQuestionAnswer", () => {
    it("should save the answer with valid data", async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      };

      const savePromise = store.dispatch(saveQuestionAnswer(answerData));
      jest.runAllTimers();
      await savePromise;

      const actions = store.getActions();
      expect(actions[0].type).toBe('questions/saveQuestionAnswer/pending');
      expect(actions[1].type).toBe('questions/saveQuestionAnswer/fulfilled');
    });

    it("should handle errors for invalid answer data", async () => {
      const invalidAnswerData = {
        authedUser: '',
        qid: '',
        answer: '',
      };

      const savePromise = _saveQuestionAnswer(invalidAnswerData);
      jest.runAllTimers();
      await expect(savePromise).rejects.toBe(
        "Please provide authedUser, qid, and answer"
      );
    });
  });
}); 