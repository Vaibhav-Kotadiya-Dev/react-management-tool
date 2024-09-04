/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import session from 'utils/session';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    session.clearItem('token')
    dispatch({ type: 'RESET' })
    navigate('/login', { replace: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div />
  )
}

export default Logout;
