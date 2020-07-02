export interface DateProp {
  startDate: string | null;
  endDate: string | null;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearDate: (
    isStartDate: boolean
  ) => (event: React.MouseEvent<unknown>) => void;
}
