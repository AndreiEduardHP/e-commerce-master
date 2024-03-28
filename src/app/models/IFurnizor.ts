export interface IFurnizor {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  rol: string;
  dateAccountCreation: string;
  languagePreference: string;
  credit: number;
  profilePicture: string;
  isDisabled: boolean;
  company: {
    id: number;
    companyName: string;
    cui: string;
    registrationNumber: string;
  };
}
