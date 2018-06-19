export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  passwordrevise?: string;
  mobilephone?: string;
  street?: string;
  city?: string;
  gtac?: string;
  newsletter?: string;
}

export type Users = User[];
