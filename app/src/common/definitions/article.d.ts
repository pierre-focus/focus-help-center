import {Section} from './section';

/** Article definition, the same as on the server. */
export interface Article {
    id?: number;
    title: string;
    description: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    published: boolean;
    publishedAt?: string;
    sections?: Section[];
    url?: string;
    informations?: string;
}