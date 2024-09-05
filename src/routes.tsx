import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Board from 'screens/Board';
import LoadingSpinner from 'components/LoadingSpinner';
import useReloadWebsite from 'utils/hooks/useReloadWebsite';
import ProjectList from 'screens/ProjectList';
import CreateProject from 'screens/CreateProject';
import Login from 'screens/Login';
import SignUp from 'screens/SignUp';
import AuthWrapper from 'screens/AuthWrapper';
import Logout from 'screens/Logout';

const RoutesStack = () => {
  return (
    <Router basename='/taskmanagementapp'>
      <Suspense
        fallback={(
          <LoadingSpinner />
        )}
      >
        {useReloadWebsite()}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/board" element={<AuthWrapper component={Board} />} />
          <Route path="/create-project" element={<AuthWrapper component={CreateProject} />} />
          <Route path="/projects" element={<AuthWrapper component={ProjectList} />} />
          <Route path="/*" element={<Navigate to="/projects" replace />} />
        </Routes> 
      </Suspense>
    </Router>
  );
};

export default RoutesStack;