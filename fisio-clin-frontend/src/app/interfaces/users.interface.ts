export interface Users {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'FISIOTERAPEUTA';
  password: string;
}

export interface cadastroResponseUser {
    message: string,
    user: Users
}