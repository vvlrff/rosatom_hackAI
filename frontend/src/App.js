import React from 'react';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import UploadPage from './pages/UploadPage';
import QuestionnairePage from './pages/QuestionnairePage';
import RedirectPage from './pages/RedirectPage';
import AnalysisPage from './pages/AnalysisPage';
import SurveyPage from './pages/SurveyPage';
import ChangeQuestionnairePage from './pages/ChangeQuestionnairePage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import DeletePage from './pages/DeletePage';
import Layout from './components/Layout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} >
    <Route index element={<HomePage />} />
    <Route path='admin' element={<RedirectPage />} />
    <Route path='admin/upload' element={<UploadPage />} />
    <Route path='admin/survey' element={<SurveyPage />} />
    <Route path='admin/change' element={<ChangeQuestionnairePage />} />
    <Route path='admin/create' element={<CreateQuestionPage />} />
    <Route path='admin/delete' element={<DeletePage />} />
    <Route path='question' element={<QuestionnairePage />} />
    <Route path='admin/analysis' element={<AnalysisPage />} />
    <Route path='admin/result' element={<ResultPage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Route>
))

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
