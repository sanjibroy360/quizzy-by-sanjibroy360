import React from "react";
import Login from "components/Login";
import QuizList from "components/Quiz/QuizList";
import AddQuiz from "components/Quiz/AddQuiz";
import EditQuiz from "components/Quiz/EditQuiz";
import PageNotFound from "components/PageNotFound";
import ShowQuiz from "components/Quiz/ShowQuiz";
import AddQuestion from "components/Question/AddQuestion";
import EditQuestion from "components/Question/EditQuestion";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useUserContext } from "./context/user";

function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={QuizList} />
      <Route exact path="/quiz/add" component={AddQuiz} />
      <Route exact path="/quiz/:quizId/edit" component={EditQuiz} />
      <Route exact path="/quiz/:quizId" component={ShowQuiz} />
      <Route exact path="/quiz/:quizId/question/add" component={AddQuestion} />
      <Route
        exact
        path="/quiz/:quizId/question/:questionId/edit"
        component={EditQuestion}
      />
      <Route component={PageNotFound} />
    </Switch>
  );
}

function NonAuthRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={QuizList} />
      <Route exact path="/login" component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default function Main() {
  let { state } = useUserContext();
  return <div>{state.user?.id ? <AuthRoutes /> : <NonAuthRoutes />}</div>;
}
