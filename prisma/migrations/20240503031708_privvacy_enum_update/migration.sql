-- AlterTable
ALTER TABLE `policies` MODIFY `type` ENUM('about', 'buy', 'complain', 'contact', 'privacy', 'refund', 'terms') NOT NULL;
