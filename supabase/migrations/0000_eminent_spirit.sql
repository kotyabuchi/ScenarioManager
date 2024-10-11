CREATE TABLE IF NOT EXISTS "game_schedules" (
	"session_id" varchar(36) PRIMARY KEY NOT NULL,
	"schedule_date" timestamp NOT NULL,
	"schedule_phase" varchar DEFAULT 'ADJUSTING' NOT NULL,
	CONSTRAINT "game_schedules_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_sessions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"scenario_id" varchar(36) NOT NULL,
	"session_phase" varchar DEFAULT 'RECRUITING' NOT NULL,
	"keeper_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scenario_tags" (
	"scenario_id" varchar(36) NOT NULL,
	"tag_id" varchar(36) NOT NULL,
	CONSTRAINT "scenario_tags_scenario_id_tag_id_pk" PRIMARY KEY("scenario_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scenarios" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"author" text,
	"description" text,
	"short_description" text,
	"scenario_image" text,
	"min_player" integer,
	"max_player" integer,
	"min_playtime" integer,
	"max_playtime" integer,
	"handout_type" varchar DEFAULT 'NONE' NOT NULL,
	"distribute_url" text,
	"created_by_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_participants" (
	"session_id" varchar(36) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"player_type" varchar DEFAULT 'PLAYER' NOT NULL,
	"player_state" varchar DEFAULT 'PENDING' NOT NULL,
	"character_sheet_url" text,
	CONSTRAINT "session_participants_session_id_user_id_pk" PRIMARY KEY("session_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_reviews" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"scenario_id" varchar(36) NOT NULL,
	"session_id" varchar(36),
	"open_comment" text,
	"spoiler_comment" text,
	"rating" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_reviews_scenario_id_user_id_unique" UNIQUE("scenario_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_scenario_preferences" (
	"scenario_id" varchar(36) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"session_id" varchar(36),
	"is_played" boolean NOT NULL,
	"is_watched" boolean NOT NULL,
	"can_keeper" boolean NOT NULL,
	"had_scenario" boolean NOT NULL,
	"is_like" boolean NOT NULL,
	CONSTRAINT "user_scenario_preferences_scenario_id_user_id_pk" PRIMARY KEY("scenario_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"discord_id" text NOT NULL,
	"user_name" text NOT NULL,
	"nickname" text NOT NULL,
	"bio" text,
	"image" text,
	"role" varchar DEFAULT 'MEMBER' NOT NULL,
	"lastlogin_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_discord_id_unique" UNIQUE("discord_id"),
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_links" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"scenario_id" varchar(36) NOT NULL,
	"session_id" varchar(36) NOT NULL,
	"video_url" text NOT NULL,
	"created_by_id" varchar(36) NOT NULL,
	CONSTRAINT "video_links_video_url_unique" UNIQUE("video_url")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_schedules" ADD CONSTRAINT "game_schedules_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_scenario_id_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."scenarios"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_keeper_id_users_id_fk" FOREIGN KEY ("keeper_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenario_tags" ADD CONSTRAINT "scenario_tags_scenario_id_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."scenarios"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenario_tags" ADD CONSTRAINT "scenario_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scenarios" ADD CONSTRAINT "scenarios_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_scenario_id_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."scenarios"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_scenario_preferences" ADD CONSTRAINT "user_scenario_preferences_scenario_id_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."scenarios"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_scenario_preferences" ADD CONSTRAINT "user_scenario_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_scenario_preferences" ADD CONSTRAINT "user_scenario_preferences_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_links" ADD CONSTRAINT "video_links_scenario_id_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."scenarios"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_links" ADD CONSTRAINT "video_links_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_links" ADD CONSTRAINT "video_links_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "game_schedules_date_idx" ON "game_schedules" USING btree ("schedule_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "game_sessions_scenario_idx" ON "game_sessions" USING btree ("scenario_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "game_sessions_keeper_idx" ON "game_sessions" USING btree ("keeper_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "scenarios_name_idx" ON "scenarios" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_reviews_scenario_idx" ON "user_reviews" USING btree ("scenario_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_reviews_session_idx" ON "user_reviews" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_scenario_preferences_session_idx" ON "user_scenario_preferences" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_discord_idx" ON "users" USING btree ("discord_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_username_idx" ON "users" USING btree ("user_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_nickname_idx" ON "users" USING btree ("nickname");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "video_links_scenario_idx" ON "video_links" USING btree ("scenario_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "video_links_session_idx" ON "video_links" USING btree ("session_id");