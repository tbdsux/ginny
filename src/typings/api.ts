export type APIResponseProps<T = undefined> =
  | {
      error: false;
      data: T;
      message?: string;
    }
  | {
      error: true;
      message: string;
    };
