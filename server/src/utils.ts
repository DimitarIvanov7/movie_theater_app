import { Repository, FindOptionsOrder } from 'typeorm';
import { PageFilter } from './interface/reactAdmin';

export const getListData = async <Entity>(
  repository: Repository<Entity>,
  filter: PageFilter<Entity>,
) => {
  const skip = filter?.perPage
    ? (Number(filter.page) - 1) * Number(filter.perPage)
    : 0;

  const total = await repository.count();

  const result = await repository.find({
    take: filter.perPage ? Number(filter.perPage) : total,
    skip,

    order: { [filter.sort]: filter.order } as any,
  });

  return {
    data: result,
    total: total,
  };
};
