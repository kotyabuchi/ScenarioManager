import { relations } from 'drizzle-orm';
import {
  HandoutType,
  ParticipantStatus,
  ParticipantType,
  Role,
  SchedulePhase,
  SessionPhase,
} from './enum';
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';
import { init } from '@paralleldrive/cuid2';

const createdId = init({ length: 36 });

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createdId()),
    discordId: text('discord_id').notNull().unique(),
    username: text('user_name').notNull().unique(),
    nickname: text('nickname').notNull(),
    bio: text('bio'),
    image: text('image'),
    role: varchar('role', {
      enum: Object.values(Role) as [string, ...string[]],
    })
      .notNull()
      .default(Role.MEMBER),
    lastloginAt: timestamp('lastlogin_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    usersDiscordIdx: index('users_discord_idx').on(table.discordId),
    usersUsernameIdx: index('users_username_idx').on(table.username),
    usersNicknameIdx: index('users_nickname_idx').on(table.nickname),
  }),
);

export const scenarios = pgTable(
  'scenarios',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createdId()),
    name: text('name').notNull(),
    author: text('author'),
    description: text('description'),
    shortDescription: text('short_description'),
    scenarioImage: text('scenario_image'),
    minPlayer: integer('min_player'),
    maxPlayer: integer('max_player'),
    minPlaytime: integer('min_playtime'),
    maxPlaytime: integer('max_playtime'),
    handoutType: varchar('handout_type', {
      enum: Object.values(HandoutType) as [string, ...string[]],
    })
      .notNull()
      .default(HandoutType.NONE),
    distributeUrl: text('distribute_url'),
    createdById: text('created_by_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    scenariosNameIdx: index('scenarios_name_idx').on(table.name),
  }),
);

export const scenarioTags = pgTable(
  'scenario_tags',
  {
    scenarioId: varchar('scenario_id', { length: 36 })
      .notNull()
      .references(() => scenarios.id, { onDelete: 'cascade' }),
    tagId: varchar('tag_id', { length: 36 })
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.scenarioId, table.tagId] }),
  }),
);

export const tags = pgTable('tags', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => createdId()),
  name: text('name').notNull().unique(),
  color: text('color'),
});

export const gameSessions = pgTable(
  'game_sessions',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createdId()),
    scenarioId: varchar('scenario_id', { length: 36 })
      .notNull()
      .references(() => scenarios.id, { onDelete: 'cascade' }),
    sessionPhase: varchar('session_phase', {
      enum: Object.values(SessionPhase) as [string, ...string[]],
    })
      .notNull()
      .default(SessionPhase.RECRUITING),
    keeperId: text('keeper_id').references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    gameSessionsScenarioIdx: index('game_sessions_scenario_idx').on(
      table.scenarioId,
    ),
    gameSessionsKeeperIdx: index('game_sessions_keeper_idx').on(table.keeperId),
  }),
);

export const sessionParticipants = pgTable(
  'session_participants',
  {
    sessionId: varchar('session_id', { length: 36 })
      .notNull()
      .references(() => gameSessions.id, { onDelete: 'cascade' }),
    userId: varchar('user_id', { length: 36 })
      .notNull()
      .references(() => users.id),
    playerType: varchar('player_type', {
      enum: Object.values(ParticipantType) as [string, ...string[]],
    })
      .notNull()
      .default(ParticipantType.PLAYER),
    playerState: varchar('player_state', {
      enum: Object.values(ParticipantStatus) as [string, ...string[]],
    })
      .notNull()
      .default(ParticipantStatus.PENDING),
    characterSheetUrl: text('character_sheet_url'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.sessionId, table.userId] }),
  }),
);

export const gameSchedules = pgTable(
  'game_schedules',
  {
    sessionId: varchar('session_id', { length: 36 })
      .notNull()
      .unique()
      .primaryKey()
      .references(() => gameSessions.id, { onDelete: 'cascade' }),
    scheduleDate: timestamp('schedule_date').notNull(),
    schedulePhase: varchar('schedule_phase', {
      enum: Object.values(SchedulePhase) as [string, ...string[]],
    })
      .notNull()
      .default(SchedulePhase.ADJUSTING),
  },
  (table) => ({
    gameSchedulesDateIdx: index('game_schedules_date_idx').on(
      table.scheduleDate,
    ),
  }),
);

export const videoLinks = pgTable(
  'video_links',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createdId()),
    scenarioId: varchar('scenario_id', { length: 36 })
      .notNull()
      .references(() => scenarios.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 36 })
      .notNull()
      .references(() => gameSessions.id, { onDelete: 'cascade' }),
    videoUrl: text('video_url').notNull().unique(),
    createdById: varchar('created_by_id', { length: 36 })
      .notNull()
      .references(() => users.id),
  },
  (table) => ({
    videoLinksScenarioIdx: index('video_links_scenario_idx').on(
      table.scenarioId,
    ),
    videoLinksSessionIdx: index('video_links_session_idx').on(table.sessionId),
  }),
);

export const userReviews = pgTable(
  'user_reviews',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createdId()),
    userId: varchar('user_id', { length: 36 })
      .notNull()
      .references(() => users.id),
    scenarioId: varchar('scenario_id', { length: 36 })
      .notNull()
      .references(() => scenarios.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 36 }).references(
      () => gameSessions.id,
    ),
    openComment: text('open_comment'),
    spoilerComment: text('spoiler_comment'),
    rating: integer('rating'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.scenarioId, table.userId),
    userReviewsScenarioIdx: index('user_reviews_scenario_idx').on(
      table.scenarioId,
    ),
    userReviewsSessionIdx: index('user_reviews_session_idx').on(
      table.sessionId,
    ),
  }),
);

export const userScenarioPreferences = pgTable(
  'user_scenario_preferences',
  {
    scenarioId: varchar('scenario_id', { length: 36 })
      .notNull()
      .references(() => scenarios.id, { onDelete: 'cascade' }),
    userId: varchar('user_id', { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 36 }).references(
      () => gameSessions.id,
    ),
    isPlayed: boolean('is_played').notNull(),
    isWatched: boolean('is_watched').notNull(),
    canKeeper: boolean('can_keeper').notNull(),
    hadScenario: boolean('had_scenario').notNull(),
    isLike: boolean('is_like').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.scenarioId, table.userId] }),
    userScenarioPreferencesSessionIdx: index(
      'user_scenario_preferences_session_idx',
    ).on(table.sessionId),
  }),
);

export const userRelations = relations(users, ({ many }) => ({
  participatedSessions: many(sessionParticipants),
  keptSessions: many(gameSessions, { relationName: 'keeper' }),
  reviews: many(userReviews),
  videoLinks: many(videoLinks),
  scenarioPreferences: many(userScenarioPreferences),
}));

export const scenarioRelations = relations(scenarios, ({ many }) => ({
  sessions: many(gameSessions),
  scenarioTags: many(scenarioTags),
  reviews: many(userReviews),
  preferences: many(userScenarioPreferences),
  videoLinks: many(videoLinks),
}));

export const scenarioTagRelations = relations(scenarioTags, ({ one }) => ({
  scenario: one(scenarios, {
    fields: [scenarioTags.scenarioId],
    references: [scenarios.id],
  }),
  tag: one(tags, {
    fields: [scenarioTags.tagId],
    references: [tags.id],
  }),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  scenarioTags: many(scenarioTags),
}));

export const gameSessionRelations = relations(
  gameSessions,
  ({ one, many }) => ({
    scenario: one(scenarios, {
      fields: [gameSessions.scenarioId],
      references: [scenarios.id],
    }),
    keeper: one(users, {
      fields: [gameSessions.keeperId],
      references: [users.id],
      relationName: 'keeper',
    }),
    participants: many(sessionParticipants),
    reviews: many(userReviews),
    preferences: many(userScenarioPreferences),
    videoLinks: many(videoLinks),
  }),
);

export const sessionParticipantRelations = relations(
  sessionParticipants,
  ({ one }) => ({
    user: one(users, {
      fields: [sessionParticipants.userId],
      references: [users.id],
    }),
    session: one(gameSessions, {
      fields: [sessionParticipants.sessionId],
      references: [gameSessions.id],
    }),
  }),
);

export const videoLinkRelations = relations(videoLinks, ({ one }) => ({
  scenario: one(scenarios, {
    fields: [videoLinks.scenarioId],
    references: [scenarios.id],
  }),
  session: one(gameSessions, {
    fields: [videoLinks.sessionId],
    references: [gameSessions.id],
  }),
  user: one(users, {
    fields: [videoLinks.createdById],
    references: [users.id],
  }),
}));

export const userReviewRelations = relations(userReviews, ({ one }) => ({
  user: one(users, {
    fields: [userReviews.userId],
    references: [users.id],
  }),
  scenario: one(scenarios, {
    fields: [userReviews.scenarioId],
    references: [scenarios.id],
  }),
  session: one(gameSessions, {
    fields: [userReviews.sessionId],
    references: [gameSessions.id],
  }),
}));

export const userScenarioPreferenceRelations = relations(
  userScenarioPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userScenarioPreferences.userId],
      references: [users.id],
    }),
    scenario: one(scenarios, {
      fields: [userScenarioPreferences.scenarioId],
      references: [scenarios.id],
    }),
    session: one(gameSessions, {
      fields: [userScenarioPreferences.sessionId],
      references: [gameSessions.id],
    }),
  }),
);

export const schema = {
  users,
  scenarios,
  gameSessions,
  gameSchedules,
  videoLinks,
  sessionParticipants,
  userReviews,
  userScenarioPreferences,
  tags,
  scenarioTags,
  userRelations,
  scenarioRelations,
  scenarioTagRelations,
  tagRelations,
  gameSessionRelations,
  sessionParticipantRelations,
  videoLinkRelations,
  userReviewRelations,
  userScenarioPreferenceRelations,
};
