
export interface CSMData {
  id: string;
  name: string;
  bookStartARR: number;
  minRetentionTarget: number;
  maxRetentionTarget: number;
  churnARR?: number;
  maxQuarterlyChurnAllowed?: number;
  quarterlyChurnTarget?: number;
  retentionRate?: number;
  attainment?: number;
}
