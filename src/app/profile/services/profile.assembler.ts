import {ProfilesResource, ProfilesResponse} from './profiles.response';
import {Profile} from '../model/profile.entity';

export class ProfileAssembler {
  static toEntityFromResource(resource: ProfilesResource): Profile {
    return {
      id: resource.id,
      type: resource.type,
      name: resource.name,
      email: resource.email,
      image: resource.image,
      occupation: resource.occupation,
      portfolio: resource.portfolio,
      biography: resource.biography,
      password: resource.password
    };
  }

  static toEntitiesFromResponse(response: ProfilesResponse): Profile[] {
    return response.profiles.map(profile => this.toEntityFromResource(profile));
  }
}
