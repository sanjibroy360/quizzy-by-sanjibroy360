import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "components/Login";
import { setAuthHeaders } from "apis/axios";
import { UserProvider } from "./context/user";
import Navbar from "components/Common/Navbar";
import Loader from "components/Common/Loader";
import QuizList from "components/Quiz/QuizList";
import AddQuiz from "components/Quiz/AddQuiz";
import EditQuiz from "components/Quiz/EditQuiz";
import PageNotFound from "components/PageNotFound";
import ShowQuiz from "components/Quiz/ShowQuiz";
import AddQuestion from "components/Question/AddQuestion";
import EditQuestion from "components/Question/EditQuestion";

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

export default function App({ currentUser }) {
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserProvider>
      <ToastContainer />
      <div className="container max-w-6xl mx-auto leading-6">
        <Router>
          <Navbar currentUser={currentUser} />
          {currentUser?.id ? <AuthRoutes /> : <NonAuthRoutes />}
        </Router>
      </div>
    </UserProvider>
  );
}
