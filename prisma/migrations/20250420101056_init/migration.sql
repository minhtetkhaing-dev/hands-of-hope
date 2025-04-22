-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'manager', 'supporter');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "nrc" TEXT,
    "gender" TEXT,
    "birthDate" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'supporter',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
