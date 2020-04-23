export interface Example {
  name: string;

  init?: any;
  run: any;
  interactions?: any[];

  description?: string;
  explanation?: string;
  interactive?: string;
}