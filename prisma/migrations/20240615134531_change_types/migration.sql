-- CreateEnum
CREATE TYPE "ScenarioHOType" AS ENUM ('なし', '公開', '秘匿');

-- CreateEnum
CREATE TYPE "PlayStatus" AS ENUM ('未プレイ', 'プレイ済み', '視聴済み');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('開始待ち', '終了済み');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('募集中', '日程調整中', '開始待ち', '終了済み');

-- CreateEnum
CREATE TYPE "SessionPlayerType" AS ENUM ('プレイヤー', '観戦');

-- CreateEnum
CREATE TYPE "SessionPlayerStatusType" AS ENUM ('未確定', '確定');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "introduction" TEXT,
    "thumbnail_path" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scenarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "short_description" TEXT,
    "thumbnail_path" TEXT,
    "min_player" INTEGER,
    "max_player" INTEGER,
    "min_playtime" INTEGER,
    "max_playtime" INTEGER,
    "handout_type" "ScenarioHOType" NOT NULL DEFAULT 'なし',
    "distribute_url" TEXT,
    "uploaded_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scenario_tags" (
    "scenario_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "scenario_tags_pkey" PRIMARY KEY ("scenario_id","tag_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scenario_play_statuses" (
    "scenario_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "PlayStatus" NOT NULL DEFAULT '未プレイ',

    CONSTRAINT "scenario_play_statuses_pkey" PRIMARY KEY ("scenario_id","user_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "scenario_id" TEXT NOT NULL,
    "status" "SessionStatus" NOT NULL,
    "keeper_id" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_players" (
    "session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "playerType" "SessionPlayerType" NOT NULL,
    "playerState" "SessionPlayerStatusType" NOT NULL,

    CONSTRAINT "session_players_pkey" PRIMARY KEY ("session_id","user_id")
);

-- CreateTable
CREATE TABLE "session_schedules" (
    "session_id" TEXT NOT NULL,
    "schedule_date" TIMESTAMP(3) NOT NULL,
    "status" "ScheduleStatus" NOT NULL DEFAULT '開始待ち',

    CONSTRAINT "session_schedules_pkey" PRIMARY KEY ("session_id","schedule_date")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "scenario_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploaded_by" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scenario_id" TEXT NOT NULL,
    "session_id" TEXT,
    "open_comment" TEXT,
    "spoiler_comment" TEXT,
    "rating" INTEGER,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "videos_url_key" ON "videos"("url");

-- AddForeignKey
ALTER TABLE "scenarios" ADD CONSTRAINT "scenarios_uploaded_user_id_fkey" FOREIGN KEY ("uploaded_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenario_tags" ADD CONSTRAINT "scenario_tags_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenario_tags" ADD CONSTRAINT "scenario_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenario_play_statuses" ADD CONSTRAINT "scenario_play_statuses_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenario_play_statuses" ADD CONSTRAINT "scenario_play_statuses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_keeper_id_fkey" FOREIGN KEY ("keeper_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_players" ADD CONSTRAINT "session_players_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_players" ADD CONSTRAINT "session_players_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_schedules" ADD CONSTRAINT "session_schedules_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
