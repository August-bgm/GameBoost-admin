export interface OperLogQuery extends PageQuery {
  operIp: string;
  title: string;
  operName: string;
  businessType: string;
  status: string;
  orderByColumn: string;
  sortOrder: string;
}

export interface OperLogVO extends BaseEntity {
  operId: string | number;
  title: string;
  businessType: number;
  operName: string;
  operUrl: string;
  operIp: string;
  operLocation: string;
  operParam: string;
  jsonResult: string;
  status: number;
  errorMsg: string;
  operTime: string;
}

export interface OperLogForm {
  operId: number | string | undefined;
  title: string;
  businessType: number;
  operName: string;
  operUrl: string;
  operIp: string;
  operLocation: string;
  operParam: string;
  jsonResult: string;
  status: number;
  errorMsg: string;
  operTime: string;
}
