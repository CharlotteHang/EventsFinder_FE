export interface TransactionInfo {
  earliestTransactionDate: string;
  latestTransactionDate: string;
  daysSpanByTransaction: string;
  transactionCount: number;
  transactions: Transaction[];
}

export interface Transaction {
  accountId: string;
  transactionDate: string;
  transactionId: string;
  description: string;
  amount: number;
  withdrawal: string;
  runningBalance: number;
  category: string;
  accountName: string;
}
