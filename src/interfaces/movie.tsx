interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface IMovieInfo {
  name: string;
  slug: string;
  origin_name: string;
  content?: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total?: string;
  quality: string;
  lang: string;
  year: number;
  actor?: string[];
  director?: string[];
  category?: Category[];
  country?: Country[];
}

export interface IPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface IMovies {
    
} 
