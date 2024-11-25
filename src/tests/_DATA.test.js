import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

describe('_DATA.js', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('_saveQuestion', () => {
    it('should save question with correctly formatted data', async () => {
      const questionData = {
        optionOneText: 'Learn React',
        optionTwoText: 'Learn Angular',
        author: 'sarahedo'
      };

      const savePromise = _saveQuestion(questionData);
      jest.runAllTimers();
      const savedQuestion = await savePromise;

      expect(savedQuestion).toBeDefined();
      expect(savedQuestion.id).toBeDefined();
      expect(savedQuestion.timestamp).toBeDefined();
      expect(savedQuestion.author).toBe(questionData.author);
      expect(savedQuestion.optionOne.text).toBe(questionData.optionOneText);
      expect(savedQuestion.optionTwo.text).toBe(questionData.optionTwoText);
      expect(savedQuestion.optionOne.votes).toEqual([]);
      expect(savedQuestion.optionTwo.votes).toEqual([]);
    });

    it('should fail when saving question with incorrect data', async () => {
      const invalidQuestionData = {
        optionOneText: '',
        optionTwoText: '',
        author: ''
      };

      const savePromise = _saveQuestion(invalidQuestionData);
      jest.runAllTimers();
      await expect(savePromise).rejects.toBe(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });

  describe('_saveQuestionAnswer', () => {
    it('should return true when correctly formatted data is passed', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne'
      };

      const savePromise = _saveQuestionAnswer(answerData);
      jest.runAllTimers();
      const result = await savePromise;
      
      expect(result).toBe(true);
    });

    it('should return an error when incorrect data is passed', async () => {
      const invalidAnswerData = {
        authedUser: '',
        qid: '',
        answer: ''
      };

      const savePromise = _saveQuestionAnswer(invalidAnswerData);
      jest.runAllTimers();
      await expect(savePromise).rejects.toBe(
        "Please provide authedUser, qid, and answer"
      );
    });
  });
}); 