import { Session } from "next-auth";

type authError = {
  name?: string;
  email?: string;
  password?: string;
};

export type CustomUser = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  role?: string | null;
};

export type CustomSession = Session & {
  user?: CustomUser | null;
  expires?: string | null;
};

export type { authError };
