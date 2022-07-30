export interface List {
  id: string;
  name: string;
  type: string;
  race: string;
  attribute: string;
}

export interface Pagination {
  previous_page_offset: number;
  previous_page: string | null;
  next_page_offset: number;
  next_page: string | null;
}
