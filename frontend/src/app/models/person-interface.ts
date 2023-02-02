export interface PersonInterface {
  PersonID: number
  PersonName?: string
  PersonGender?: string
  PersonAddress?: string
  PersonMobileNo?: string
  DateOfBirth?: Date
  PersonAge?: Number
  inEdit: boolean 
  locked?: boolean
  expanded?: boolean
  Discontinued?: boolean
}
export interface PageState {
  skip: number;
  take: number;
}
export interface User {
  UserID: number;
  Email: string;
  Role:string;
}

export interface Category{
  CategoryID: string;
  CategoryName: string; 
}
