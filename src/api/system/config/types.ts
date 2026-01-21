export interface ConfigVO extends BaseEntity {
  configId: number | string;
  configKey: string;
  configValue: string;
  remark: string;
}

export interface ConfigForm {
  configId: number | string | undefined;
  configKey: string;
  configValue: string;
  remark: string;
}

export interface ConfigQuery extends PageQuery {
  configKey: string;
}
