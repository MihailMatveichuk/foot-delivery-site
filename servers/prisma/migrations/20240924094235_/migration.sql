/*
  Warnings:

  - The primary key for the `Avatar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Avatar` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `_id` was added to the `Avatar` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_user_id_fkey";

-- AlterTable
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "Avatar_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("_id");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
