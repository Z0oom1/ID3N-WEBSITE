import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { sendLeadNotification } from "./whatsapp";
import { addLead, getAllLeads } from "./leads-storage";

export const appRouter = router({
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
        try {
          // Save lead to JSON file
          const lead = addLead({
            name: input.name,
            email: input.email,
            phone: input.phone,
            cpf: input.cpf,
            company: input.company,
            service: input.service,
          });
          
          // Send WhatsApp notification
          try {
            await sendLeadNotification({
              name: input.name,
              email: input.email,
              phone: input.phone,
              cpf: input.cpf,
              company: input.company,
              service: input.service,
              message: input.message,
            });
          } catch (error) {
            console.error('Error sending WhatsApp notification:', error);
            // Don't throw - WhatsApp notification is optional
          }
          
          return {
            success: true,
            lead,
          };
        } catch (error) {
          console.error('Error creating lead:', error);
          throw new Error('Failed to create lead');
        }
      }),

    list: publicProcedure.query(() => {
      try {
        return getAllLeads();
      } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
