import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const chat = pgTable('chat', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  message: varchar({ length: 255 }).notNull(),
  sender: varchar({ length: 255 }).notNull(),
});
