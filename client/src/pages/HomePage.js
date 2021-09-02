import React from 'react';
import { Layout } from '../components/layout';
import { Hero } from '../components/layout/Hero';

function HomePage() {
  return (
    <Layout>
      <Hero heroHeight='720px'>
        <div className='hero__content hero__main'>
          <h1>Learn From Industry Experts</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            maximus tortor at diam gravida posuere. Curabitur et malesuada mi.
          </p>
          <br />
          <div>
            <button className='btn'>Get Started</button>
          </div>
        </div>
      </Hero>
      <div className='container'>
        <h2>Home Page</h2>
      </div>
    </Layout>
  );
}

export default HomePage;
