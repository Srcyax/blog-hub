import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { User } from "@/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hanlder = (req: Request) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: User,
		createContext: () => ({ prisma }),
	});

export { hanlder as GET, hanlder as POST };
