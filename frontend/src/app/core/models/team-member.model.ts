export interface Socials {
  id: number;
  iconClass: string;
  link: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socials?: Socials[]; 
}
