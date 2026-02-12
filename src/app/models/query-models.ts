export  interface QueryFilters
{

pageNumber: number;
pageSize: number;
queryFields?: QueryFields[]
}

export  interface QueryFields
{
keyField : string;
keyValue : string| number;
method: string;
}
