export interface BizLogQueryBo {
  bizType?: string;
  beginTime?: string;
  endTime?: string;
}

export interface BizLogQuery extends BizLogQueryBo, PageQuery {}

export interface AssetLogItem {
  amount?: number | string;
  before?: number | string;
  after?: number | string;
  [key: string]: any;
}

export interface BizLogVO {
  id: number;
  bizType: string;
  assetLog: AssetLogItem[];
  createBy: number;
  createTime: string;
  // 关联的用户信息（前端补充）
  userName?: string;
  realName?: string;
  phonenumber?: string;
}