import React from 'react';
import Header from 'components/Header';
import TrelloBoard from 'screens/TrelloBoard';
import Breadcrumb from 'components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const Board = () => {
  const location: any = useLocation();

  return (
    <div>
      <Header />
      <Breadcrumb label={location?.state?.projectName ?? ''} />
      <TrelloBoard projectId={location?.state?.projectId} />
    </div>
  );
};

export default Board;
