import { cookies } from "next/headers";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import JWT, { JwtPayload } from "jsonwebtoken";
import { Session } from "./functions/GetSession";

export const User = router({
	getUser: publicProcedure.query(async ({ ctx }) => {
		if (!Session()) return;

		const token = cookies().get("acess_token")?.value as string;
		const userTokenData = JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

		if (!userTokenData) {
			return;
		}

		const userInfo = await ctx.prisma.user.findUnique({
			where: {
				id: userTokenData.id,
			},
		});

		if (!userInfo) {
			return;
		}

		const { password, ...user } = userInfo;

		return {
			response: user,
		};
	}),

	getUserProfile: publicProcedure
		.input(
			z.object({
				id: z.number(),
			})
		)
		.query(async ({ input, ctx }) => {
			if (!Session()) return;

			const profile = await ctx.prisma.user.findUnique({
				where: {
					id: input.id,
				},
				include: {
					comment: true,
				},
			});

			if (!profile) {
				return;
			}

			return { response: profile };
		}),
});

export type UserRouter = typeof User;
