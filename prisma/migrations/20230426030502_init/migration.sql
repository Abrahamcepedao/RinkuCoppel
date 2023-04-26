-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "EmpRole" AS ENUM ('CHOFER', 'CARGADOR', 'AUXILIARES');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "num" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "EmpRole" NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("num")
);

-- CreateTable
CREATE TABLE "Movements" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "deliveries" INTEGER NOT NULL,
    "totBonus" DOUBLE PRECISION NOT NULL,
    "totDeliveries" DOUBLE PRECISION NOT NULL,
    "isr" DOUBLE PRECISION NOT NULL,
    "isrAdd" DOUBLE PRECISION NOT NULL,
    "cupons" DOUBLE PRECISION NOT NULL,
    "gross" DOUBLE PRECISION NOT NULL,
    "net" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Movements" ADD CONSTRAINT "Movements_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Employees"("num") ON DELETE RESTRICT ON UPDATE CASCADE;
