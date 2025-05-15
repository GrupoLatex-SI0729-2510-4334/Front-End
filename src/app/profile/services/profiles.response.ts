export interface ProfilesResponse {
  profiles: ProfilesResource[];
}

export interface ProfilesResource {
  id: number;
  type: string;
  name: string;
  email: string;
  image: string;
  occupation: string;
  biography: string;
}
