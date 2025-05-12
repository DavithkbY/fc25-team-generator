import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema - keeping the existing users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Team configuration schema
export const teamConfigs = pgTable("team_configs", {
  id: serial("id").primaryKey(),
  team1: text("team1").array().notNull(),
  team2: text("team2").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTeamConfigSchema = createInsertSchema(teamConfigs).omit({
  id: true,
  createdAt: true,
});

export type InsertTeamConfig = z.infer<typeof insertTeamConfigSchema>;
export type TeamConfig = typeof teamConfigs.$inferSelect;
