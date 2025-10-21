/*
  Warnings:

  - You are about to drop the column `slug` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `_PostTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_PostTags" DROP CONSTRAINT "_PostTags_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PostTags" DROP CONSTRAINT "_PostTags_B_fkey";

-- DropIndex
DROP INDEX "public"."post_slug_idx";

-- DropIndex
DROP INDEX "public"."post_slug_key";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "slug",
DROP COLUMN "title";

-- DropTable
DROP TABLE "public"."_PostTags";

-- DropTable
DROP TABLE "public"."tag";
