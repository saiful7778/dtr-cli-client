export interface User {
  fullName: string;
  email: string;
  hashedPassword: string;
  image?: string | null;
  role: "user" | "admin" | "superAdmin";
  access: boolean;
}
