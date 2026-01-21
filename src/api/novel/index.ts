import request from '@/utils/request';
import { NovelQuery, NovelVO, NovelInfo } from './types';
import { AxiosPromise } from 'axios';

// 查询小说列表
export function listNovel(query: NovelQuery): AxiosPromise<NovelVO> {
  return request({
    url: '/novel/list',
    method: 'get',
    params: query
  });
}

// 获取小说详情（新增）
export function getNovelInfo(id: number): AxiosPromise<NovelInfo> {
  return request({
    url: '/novel/' + id,
    method: 'get'
  });
}

// 新增小说
export function addNovel(data: FormData) {
  return request({
    url: '/novel/insert',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 修改小说
export function updateNovel(data: FormData) {
  return request({
    url: '/novel/update',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 删除小说
export function delNovel(ids: number | number[] | string | string[]) {
  return request({
    url: '/novel/delete',
    method: 'post',
    data: Array.isArray(ids) ? ids : [ids]
  });
}