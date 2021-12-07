// There is an issue with weather api (response with hourly param has daily table and opposite for daily)
// That's why they are reversed
export enum PERIODS {
  'DAILY' = 'daily',
  'HOURLY' = 'hourly'
}
