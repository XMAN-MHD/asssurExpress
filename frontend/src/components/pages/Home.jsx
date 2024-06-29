import React, { Suspense } from 'react';
import Hero from '../HomeHero'; // importing Hero component
import Services from '../HomeServices'; // importing Services component
import HowItWorks from '../HomeHowItWorks'; // importing HowItWorks component
import NeedHelp from '../dashboard/HomeNeedHelp'; // importing NeedHelp component
import Footer from '../Footer'; // importing Footer component
import ErrorBoundary from '../ErrorBoundary';

const Home = () => {
  return (
    <>
      {/* Suspense and lazy loading can be used for better performance */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Error boundary to catch errors in Hero component */}
        <ErrorBoundary>
          <Hero />
          <Services />
          <HowItWorks />
          <NeedHelp />
          <Footer />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default Home;
