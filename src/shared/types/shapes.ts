import { Nullable } from 'src/shared';

export namespace RemoteShapes {
  export interface IUserShape {
    first_name: string;
    last_name: string;
    patronymic: Nullable<string>;
    email: string;
    initials: string;
    inn: Nullable<string>;
    job_link: Nullable<string>;
    job_title: Nullable<string>;
    passport_info: Nullable<string>;
    role: number;
  }

  export interface ITransactionShape {
    request_number: number;
    check_code: number;
    status: number;
    comment: string;
    issuer: Nullable<string>;
    employee: Nullable<string>;
    transfer_amount: number;
  }

  export interface IOrganizationShape {
    account_opening_date: string;
    branch: string;
    company: string;
    country_of_registration: string;
    okved: string;
    inn: string;
  }

  export interface IChatShape {
    created_at: string;
    customer: string;
    employee: string;
    title: string;
  }
}
