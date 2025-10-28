-- CreateTable
CREATE TABLE "monthly_registers" (
    "id" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expense" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "extraIncome" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "extraExpense" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monthly_registers" ADD CONSTRAINT "monthly_registers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
