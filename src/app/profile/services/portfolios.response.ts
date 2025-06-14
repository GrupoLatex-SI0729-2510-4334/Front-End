export interface PortfoliosResponse {
  portfolios: PortfoliosResource[];
}

export interface PortfoliosResource {
  title: string;
  description: string;
  urlImage: string;
  type: string;
  url: string;
  releasedAt: string;
}
