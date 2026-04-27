import React from 'react';
import { useNavigate } from 'react-router-dom';
import TransportTablePage from './TransportTablePage';

function TransportListScreen({ transportCategory, onCategoryChange }) {
  const navigate = useNavigate();

  return (
    <TransportTablePage
      selectedCategory={transportCategory}
      onCategoryChange={onCategoryChange}
      onOpen={(row, nextMode) => {
        navigate('/transport/detail', {
          state: {
            transport: row,
            mode: nextMode,
          },
        });
      }}
    />
  );
}

export default TransportListScreen;
