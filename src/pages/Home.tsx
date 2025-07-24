import React, { useEffect } from 'react';
import { useAppActions } from '../hooks/useAppAction';
import { useAppSelector } from '../hooks/useAppSelector';

const Home: React.FC = () => {
  const { fetchUsers } = useAppActions();
  const { users, status, error } = useAppSelector(state => state.users);

  console.log(users)

  useEffect(() => {
    fetchUsers();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <ul>{
        users.length ? users.map(user => (
          <li key={user.id}>{user.name}</li>
        )) : <li>No users found</li>
      }</ul>
    </div>
  );
};

export default Home;
