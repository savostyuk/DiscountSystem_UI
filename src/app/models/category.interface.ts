import { ITag } from "./tag.interface";

export interface ICategory {
    id: string;
    name?: string;
    categoryName?: string;
    tags?: Array<ITag>;
}
