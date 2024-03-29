import React, { useState } from "react";
import Login from "components/Login";
import QuizList from "components/Quiz/QuizList";
import AddQuiz from "components/Quiz/AddQuiz";
import EditQuiz from "components/Quiz/EditQuiz";
import PageNotFound from "components/PageNotFound";
import ShowQuiz from "components/Quiz/ShowQuiz";
import AddQuestion from "components/Question/AddQuestion";
import EditQuestion from "components/Question/EditQuestion";
import NewAttempt from "./components/Attempt/NewAttempt";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useUserContext } from "./context/user";
import ShowReport from "components/Report/ShowReport";
import DownloadReport from "components/Report/DownloadReport";
import Hompage from "./Hompage";

function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={QuizList} />
      <Route exact path="/dashboard" component={QuizList} />
      <Route exact path="/dashboard/quizzes/add" component={AddQuiz} />
      <Route
        exact
        path="/dashboard/quizzes/:quizId/edit"
        component={EditQuiz}
      />
      <Route exact path="/dashboard/quizzes/:quizId" component={ShowQuiz} />
      <Route
        exact
        path="/dashboard/quizzes/:quizId/questions/add"
        component={AddQuestion}
      />
      <Route
        exact
        path="/dashboard/quizzes/:quizId/questions/:questionId/edit"
        component={EditQuestion}
      />
      <Route exact path="/dashboard/reports" component={ShowReport} />
      <Route exact path="/dashboard/reports/download" component={DownloadReport} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

function NonAuthRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Hompage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/public/:slug/attempt/new" component={NewAttempt} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default function Main() {
  let { state } = useUserContext();
  return <div>{state.user?.id ? <AuthRoutes /> : <NonAuthRoutes />}</div>;
}
