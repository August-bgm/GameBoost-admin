import request from '@/utils/request';
import { OperLogQuery, OperLogVO } from './types';
import { AxiosPromise } from 'axios';

// 查询操作日志列表
export function list(query: OperLogQuery): AxiosPromise<OperLogVO[]> {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  });
}