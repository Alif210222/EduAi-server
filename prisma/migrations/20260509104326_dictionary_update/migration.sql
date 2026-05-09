/*
  Warnings:

  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `language` to the `DictionaryWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translation` to the `DictionaryWord` table without a default value. This is not possible if the table is not empty.
  - Made the column `example` on table `DictionaryWord` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "DictionaryWord_word_key";

-- AlterTable
ALTER TABLE "DictionaryWord" ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "translation" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "example" SET NOT NULL;

-- DropTable
DROP TABLE "FAQ";

-- AddForeignKey
ALTER TABLE "DictionaryWord" ADD CONSTRAINT "DictionaryWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
