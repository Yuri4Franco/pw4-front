import { useAuth } from '../contexts/authContext';

const useAuthUser = () => {
  const { user, login, logout } = useAuth();
  return { user, login, logout };
};

export default useAuthUser;
