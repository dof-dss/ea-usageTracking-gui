export interface PaginatedReponse<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    nextPage: string;
    previousPage: string;
    total: number;
}