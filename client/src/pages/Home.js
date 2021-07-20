import React from 'react';

// Import ThoughtList query from components
import ThoughtList from '../components/ThoughtList';


// Import useQuery
import { useQuery } from '@apollo/react-hooks';

// Import thought query from query.js file
import { QUERY_THOUGHTS } from '../utils/queries';


const Home = () => {

  // Use useQuery hook to make query requests
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // Accessing thoughts query to render thoughts on homepage
  const thoughts = data?.thoughts || [];
  console.log(thoughts);


  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div> Loading... </div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};


export default Home;