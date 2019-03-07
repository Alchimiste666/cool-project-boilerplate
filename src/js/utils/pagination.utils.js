import { pick } from 'lodash-es';

export function pickPagination(data) {
    const pagination = pick(data, ['page', 'count', 'pageSize', 'totalPages']);
    return pagination;
}