export interface Account {
  accountId: string
  institutionName: string
  accountName: string
  transitNumber: string
  accountNumber: string
  balance: number
  balanceUpdated: number
  isSelected: boolean
}

export interface AccountProp {
  accounts: Account[]
  handleAccountChange: (accountId: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  selectAllAccounts: (selectAll:boolean) => (
    event: React.MouseEvent<unknown>
  ) => void
}
