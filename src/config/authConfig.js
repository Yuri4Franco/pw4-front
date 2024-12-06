const TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

// Salva o token no localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Obtém o token do localStorage
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove o token e os dados do usuário
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

// Salva os dados do usuário no localStorage
export const setAuthData = (data) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
};

// Realiza o login
export const login = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login falhou');

    const data = await response.json();
    setAuthData(data); // Salva os dados no localStorage
    return data;
  } catch (error) {
    throw error;
  }
};

// Realiza o logout
export const logout = () => {
  clearAuthData(); // Remove os dados
  window.location.href = '/login'; // Redireciona para o login
};
