import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../HomeHero'; // importing Hero component
import Services from '../HomeServices'; // importing Services component
import HowItWorks from '../HomeHowItWorks'; // importing HowItWorks component
import NeedHelp from '../HomeNeedHelp'; // importing NeedHelp component
import Footer from '../Footer'; // importing Footer component
import ErrorBoundary from '../ErrorBoundary';

const Home = () => {
  return (
    <>
      {/* Using react-helmet for SEO */}
      <Helmet>
        <title>Accueil - Assure'Express</title>
        <meta name="description" content="Bienvenue sur notre application d'assurance. Obtenez les meilleures polices d’assurance, découvrez son fonctionnement et obtenez de l’aide lorsque vous en avez besoin." />
        <meta name="keywords" content="assurance, application d'assurance, assurance en ligne, achetez une assurance, meilleures polices d'assurance, comment ça marche, obtenir de l'aide" />
        <link rel="canonical" href="http://yourwebsite.com/home" />
      </Helmet>
      
      {/* Suspense and lazy loading for better performance */}
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
