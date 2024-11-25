import { setUsers } from "../users/usersSlice";
import { setQuestions } from "../questions/questionsSlice";
import { _getUsers, _getQuestions } from "../../_DATA";

export function handleInitialData() {
  return async (dispatch) => {
    try {
      const [backendUsers, backendQuestions] = await Promise.all([
        _getUsers(),
        _getQuestions()
      ]);
      dispatch(setUsers(backendUsers));
      dispatch(setQuestions(backendQuestions));
    } catch (error) {
      console.error("Error loading initial data:", error);
      throw error;
    }
  };
}
