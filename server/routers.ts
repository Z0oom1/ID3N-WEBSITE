import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { sendLeadNotification } from "./whatsapp";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    create: publicProcedure
      .input((input) => {
        if (typeof input !== 'object' || input === null) throw new Error('Invalid input');
        const obj = input as Record<string, unknown>;
        return {
          name: String(obj.name || ''),
          email: String(obj.email || ''),
          phone: String(obj.phone || ''),
          cpf: String(obj.cpf || ''),
          company: String(obj.company || ''),
          service: String(obj.service || ''),
          message: obj.message ? String(obj.message) : undefined,
        };
      })
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database not available');
        
        const result = await db.insert(leads).values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          cpf: input.cpf,
          company: input.company,
          service: input.service,
          message: input.message,
          whatsappSent: 0,
        });
        
        try {
          const whatsappResult = await sendLeadNotification({
            name: input.name,
            email: input.email,
            phone: input.phone,
            cpf: input.cpf,
            company: input.company,
            service: input.service,
            message: input.message,
          });
          
          if (whatsappResult.success) {
            await db.update(leads).set({ whatsappSent: 1 });
          }
        } catch (error) {
          console.error('Error sending WhatsApp notification:', error);
        }
        
        return result;
      }),
  }),
});

export type AppRouter = typeof appRouter;
