-- AlterTable
ALTER TABLE `policies` MODIFY `type` ENUM('about', 'refund', 'contact', 'complain', 'privacy') NOT NULL;
