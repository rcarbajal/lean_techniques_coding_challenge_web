export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

export interface ApiResponse<T> {
    message?: string,
    data?: T | null
}