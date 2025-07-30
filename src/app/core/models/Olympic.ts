import { Participation } from './Participation';

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}

export interface MedalChartData {
  value: number;
  name: string;
  id: number;
}

export interface MedalHistory {
  year: number;
  totalMedals: number;
}
