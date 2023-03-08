export default interface fachschaft_strapi {
  data: fachschaft_data[];
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface fachschaft_data {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  fachwart: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}