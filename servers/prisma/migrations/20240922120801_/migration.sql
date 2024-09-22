-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateTable
CREATE TABLE "Avatar" (
    "_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_public_id_key" ON "Avatar"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_user_id_key" ON "Avatar"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
