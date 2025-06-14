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
  portfolio: [];
  biography: string;
  password: string;
}
