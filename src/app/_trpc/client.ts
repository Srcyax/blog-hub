import { createTRPCReact } from "@trpc/react-query";

import { type UserRouter } from "@/server";

export const trpc = createTRPCReact<UserRouter>({});
