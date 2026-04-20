import React from 'react';

import Footer from './Footer';
import PageName from './PageName';
import TopNav from './TopNav';
import UpperBar from './UpperBar';

function MainLayout({ user, onLogout, pageName, selectedOperation, children }) {
  return (
    <>
      <UpperBar />
      <TopNav user={user} onLogout={onLogout} selectedOperation={selectedOperation} />
      <PageName title={pageName} />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
