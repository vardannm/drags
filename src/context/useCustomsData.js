import { useContext } from 'react';
import { CustomsDataContext } from './customsDataContext';

export function useCustomsData() {
  const context = useContext(CustomsDataContext);
  if (!context) {
    throw new Error('useCustomsData must be used within CustomsDataProvider');
  }
  return context;
}
