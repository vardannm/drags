import React from 'react';

import Footer from './Footer';
import PageName from './PageName';
import TopNav from './TopNav';
import UpperBar from './UpperBar';

function MainLayout({ user, onLogout, pageName, selectedOperation, theme, setTheme, children }) {
  return (
    <div className='main-layout'>
      <UpperBar />
      <TopNav
        user={user}
        onLogout={onLogout}
        selectedOperation={selectedOperation}
        theme={theme}
        setTheme={setTheme}
      />
      <PageName title={pageName} />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
