export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorPayload {
  errors: Array<{
    field: string;
    messages: string;
  }>;
}
