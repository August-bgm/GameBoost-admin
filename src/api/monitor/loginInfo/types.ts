export interface LoginInfoVO {
  infoId: string | number;
  userName: string;
  status: string;
  ipaddr: string;
  loginLocation: string;
  msg: string;
  loginTime: string;
}

export interface LoginInfoQuery extends PageQuery {
  ipaddr: string;
  userName: string;
  status: string;
  orderByColumn: string;
  sortOrder: string;
}
