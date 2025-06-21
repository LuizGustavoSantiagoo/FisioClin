export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'FISIOTERAPEUTA';
}

export interface LoginResponse {
  token: string;
  user: User;
}