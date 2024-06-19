/*
  Warnings:

  - A unique constraint covering the columns `[discord_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discord_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "discord_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id","role")
);

-- CreateTable
CREATE TABLE "user_scenario_infos" (
    "scenario_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" TEXT,
    "is_played" BOOLEAN NOT NULL,
    "is_watched" BOOLEAN NOT NULL,
    "can_keeper" BOOLEAN NOT NULL,
    "had_scenario" BOOLEAN NOT NULL,
    "is_like" BOOLEAN NOT NULL,

    CONSTRAINT "user_scenario_infos_pkey" PRIMARY KEY ("scenario_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_discord_id_key" ON "users"("discord_id");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_scenario_infos" ADD CONSTRAINT "user_scenario_infos_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_scenario_infos" ADD CONSTRAINT "user_scenario_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_scenario_infos" ADD CONSTRAINT "user_scenario_infos_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
