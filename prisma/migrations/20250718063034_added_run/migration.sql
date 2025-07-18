-- CreateTable
CREATE TABLE "zapRun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "zapRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zapRun" ADD CONSTRAINT "zapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
