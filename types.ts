export interface NewsInput {
  id: number;
  content: string;
}

export interface GeneratedData {
  homePage: string;
  aboutPage: string;
  contactPage: string;
  rewrittenNews: string[];
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AppState {
  apiKey: string;
  url: string;
  province: string;
  newsItems: NewsInput[];
  status: GenerationStatus;
  data: GeneratedData | null;
  error: string | null;
}