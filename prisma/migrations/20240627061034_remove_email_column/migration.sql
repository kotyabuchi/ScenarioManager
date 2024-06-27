/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `verification_tokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "verification_tokens_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "email";
