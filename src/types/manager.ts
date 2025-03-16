
export interface CSMData {
  id: string;
  name: string;
  bookStartARR: number;
  minRetentionTarget: number;
  maxRetentionTarget: number;
  maxQuarterlyChurnAllowed?: number;
  quarterlyChurnTarget?: number;
}
