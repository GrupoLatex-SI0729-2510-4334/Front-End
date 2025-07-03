import {PortfoliosResource, PortfoliosResponse} from './portfolios.response';
import {Portfolio} from '../model/portfolio.entity';

export class PortfolioAssembler {
  static toEntityFromResource(resource: PortfoliosResource): Portfolio {
    return {
      title: resource.title,
      description: resource.description,
      urlImage: resource.urlImage,
      type: resource.type,
      url: resource.url,
      releasedAt: resource.releasedAt
    };
  }

  static toEntitiesFromResponse(response: PortfoliosResponse): Portfolio[] {
    return response.portfolios.map(portfolio => this.toEntityFromResource(portfolio));
  }
}
