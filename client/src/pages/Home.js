import React from 'react';

// Import ThoughtList query from components
import ThoughtList from '../components/ThoughtList';

// Import ThoughtForm
import ThoughtForm from '../components/ThoughtForm';

// Import FriendList component
import FriendList from '../components/FriendList';


// Import useQuery
import { useQuery } from '@apollo/react-hooks';

// Import thought query from query.js file
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

// Import AuthService
import Auth from '../utils/auth';


const Home = () => {

  // Use useQuery hook to make query requests
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // Use object destructuring to extract `data` from the `useQuery` 
  // Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // Accessing thoughts query to render thoughts on homepage
  const thoughts = data?.thoughts || [];

  // Authorize loggedIn function
  const loggedIn = Auth.loggedIn();


  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div> Loading... </div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};


export default Home;