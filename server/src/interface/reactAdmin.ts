export interface ListResult<Result> {
  data: Result;
  total?: number;
}

export type PageFilter<Entity> = {
  perPage?: string;

  page?: string;

  sort: keyof Entity;

  order?: 'ASC' | 'DESC';
};
