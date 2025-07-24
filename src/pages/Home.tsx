import React, { useEffect } from 'react';
import { useAppActions } from '../hooks/useAppAction';
import { useAppSelector } from '../hooks/useAppSelector';
import { Loading } from '../components/common/Loading';
import { Alert } from '../components/common/Alert';

const Home: React.FC = () => {
  const { fetchUsers } = useAppActions();
  const { users, status, error } = useAppSelector(state => state.users);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (status === 'loading') {
    return <Loading />;
  }

  if (error) {
    return <Alert message={error} severity="error" />;
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
