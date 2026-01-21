export interface NoticeVO extends BaseEntity {
  noticeId: number | string;
  conversationId: number | string;
  title: string;
  noticeType: string;
  content: string;
  status: string;
}

export interface NoticeQuery extends PageQuery {
  title: string;
  noticeType: string;
  status: string;
  content: string;
}

export interface NoticeForm {
  noticeId: number | string | undefined;
  title: string;
  content: string;
  status: string;
}
