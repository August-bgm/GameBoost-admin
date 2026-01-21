// 角色信息接口
export interface characterItem {
  name?: string;
  baseDescription?: string;
  currentAttributes?: string;
  [key: string]: string | undefined;
}

export interface NovelVO {
  id: number;
  title: string;
  author: string;
  url: string;
  intro: string;
  category: string;
  status: string;
  viewCount: number;
  createTime?: string;
}

// 完整的小说信息（从详情接口获取）
export interface NovelInfo {
  id: number;
  title: string;
  author: string;
  url: string;
  intro: string;
  category: string;
  status: string;
  viewCount: number;
  worldSetting: string;
  mainStoryline: string;
  writingStyle: string;
  characters: characterItem[];
  createTime?: string;
}

export interface NovelForm {
  id?: number;
  title: string;
  author?: string;
  url?: string;
  intro?: string;
  category?: string;
  viewCount: number;
  status?: string;
  worldSetting: string;
  mainStoryline: string;
  writingStyle?: string;
  characters?: characterItem[];
}

export interface NovelQuery extends PageQuery {
  title?: string;
  author?: string;
  intro?: string;
  category?: string;
  status?: string;
}