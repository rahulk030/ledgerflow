export type TransactionStatus='Matched'|'Exception'|'Pending'
export interface Transaction{id:string;reference:string;account:string;amount:number;currency:string;bookedAt:string;status:TransactionStatus;reason?:string}
export interface DashboardMetrics{transactionCount:number;settlementTotal:number;exceptionCount:number;reconciliationRate:number}
