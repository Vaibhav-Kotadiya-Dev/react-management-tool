import React from 'react';
import Header from 'components/Header';
import TrelloBoard from 'screens/TrelloBoard';
import Breadcrumb from 'components/Breadcrumb';

const Board = () => {
  return (
    <div>
      <Header />
      <Breadcrumb label='Test board' />
      <TrelloBoard />
    </div>
  );
};

export default Board;
