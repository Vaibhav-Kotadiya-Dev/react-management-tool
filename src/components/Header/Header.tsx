import React, { useState } from 'react';
import Settings from 'components/Settings';
import { ReactComponent as TrelloIcon } from 'assets/icons/trello-icon.svg';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  return (
    <div className="header">
      <div
        className="header__home-button-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate('/')}
        role="presentation"
      >
        <div className={`header__home-button-container__icon-wrapper ${isHovered ? 'hovered' : ''}`}>
          <TrelloIcon />
        </div>
        <p className="header__home-button-container__title">Board</p>
      </div>
      {/* <div className="header__line" /> */}
      <Settings />
    </div>
  );
};

export default Header
