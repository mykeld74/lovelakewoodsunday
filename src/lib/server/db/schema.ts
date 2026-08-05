import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

/** Someone offering to help on the morning of the event. */
export const volunteerSignup = pgTable('volunteer_signup', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	/** Which church they attend, if any — always optional. */
	church: text('church'),
	/** Role ids from `src/lib/data/volunteer.ts`. */
	roles: text('roles').array().notNull().default([]),
	notes: text('notes'),
	/** Flipped by whoever works the list, so nobody gets contacted twice. */
	contacted: boolean('contacted').notNull().default(false),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

/** A general question from the contact form. */
export const contactMessage = pgTable('contact_message', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	message: text('message').notNull(),
	answered: boolean('answered').notNull().default(false),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export * from './auth.schema';
