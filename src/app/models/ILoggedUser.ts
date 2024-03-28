export interface ILoggedUser {
  loggedUser: {
    credit: number;
    dateAccountCreation: string;
    email: string;
    firstName: string;
    id: number;
    languagePreference: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    profilePicture: string;
    username: string;
    rol: string;
    company: {
      id: number;
      companyName: string;
      cui: string;
      registrationNumber: string;
    };
  };

  token: string;
}
