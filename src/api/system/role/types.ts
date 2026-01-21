/**
 * 菜单树形结构类型
 */
export interface RoleVO extends BaseEntity {
  roleId: string | number;
  roleName: string;
  roleKey: string;
  menuCheckStrictly: boolean;
  status: string;
  delFlag: string;
  remark?: any;
  menuIds?: Array<string | number>;
  expireTime: string;
}

export interface RoleQuery extends PageQuery {
  roleName: string;
  roleKey: string;
  status: string;
}

export interface RoleForm {
  roleName: string;
  roleKey: string;
  status: string;
  menuCheckStrictly: boolean;
  remark: string;
  roleId: string | undefined;
  menuIds: Array<string | number>;
}
