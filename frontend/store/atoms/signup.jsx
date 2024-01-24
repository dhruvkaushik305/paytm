import { atom } from "recoil";
export const credentialsAtom = atom({
  key: "signup",
  default: {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  },
});
