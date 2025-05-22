import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface FilterInputs {
    search: string,
    product_type_id: string,
    lead_source_id: string
}

export interface Paginator {
    data: Array<any>,
    links: Array<any>,
    per_page: number,
    current_page: number,
    path: string,
    total: number,
    last_page: number
}

export interface Ticket {
    id: number,
    title: string,
    description: string,
    status: string,
    category_id: number,
    created_by: number,
}
