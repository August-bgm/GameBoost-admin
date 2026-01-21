import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MenuQuery, MenuVO, MenuForm, MenuTreeOption, RoleMenuTree } from './types';

interface MenuTreeResponse {
  menuId: string | number;
  menuName: string;
  parentId: string | number;
  orderNum: number;
  children?: MenuTreeResponse[];
}
interface RoleMenuTreeResponse {
  menus: MenuTreeResponse[];
  checkedKeys: string[];
}
const transformMenuTree = (menu: MenuTreeResponse): MenuTreeOption => {
  return {
    id: menu.menuId,
    label: menu.menuName,
    parentId: menu.parentId,
    weight: menu.orderNum,
    children: menu.children?.map(transformMenuTree)
  };
};



// 查询菜单列表
export const listMenu = (query?: MenuQuery): AxiosPromise<MenuVO[]> => {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  });
};

export const treeselect = (): AxiosPromise<MenuTreeOption[]> => {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  }).then((response: any) => {
    response.data = response.data.map(transformMenuTree);
    return response;
  });
};

export const roleMenuTreeselect = (roleId: string | number): AxiosPromise<RoleMenuTree> => {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  }).then((response: any) => {
    response.data = {
      menus: response.data.menus.map(transformMenuTree),
      checkedKeys: response.data.checkedKeys
    };
    return response;
  });
};

// 新增菜单
export const addMenu = (data: MenuForm) => {
  return request({
    url: '/system/menu/insert',
    method: 'post',
    data: data
  });
};

// 修改菜单
export const updateMenu = (data: MenuForm) => {
  return request({
    url: '/system/menu/update',
    method: 'post',
    data: data
  });
};

// 删除菜单
export const delMenu = (menuId: string | number) => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'post'
  });
};

// 级联删除菜单
export const cascadeDelMenu = (menuIds: Array<string | number>) => {
  return request({
    url: '/system/menu/cascade/' + menuIds,
    method: 'post'
  });
};
