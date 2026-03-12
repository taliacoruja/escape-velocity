export interface DestinationImages {
  png: string;
  webp: string;
}

export interface Destination {
  name: string;
  images: DestinationImages;
  description: string;
  distance: string;
  travel: string;
}

export interface CrewMember {
  name: string;
  images: DestinationImages;
  role: string;
  bio: string;
}

export interface TechnologyImages {
  portrait: string;
  landscape: string;
}

export interface Technology {
  name: string;
  images: TechnologyImages;
  description: string;
}
