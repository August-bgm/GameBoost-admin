export {};
declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number;
    msg: string;
  }
}
