import { contries } from "./countries";

// This method filters through the countries helper file and returns country code for the passed nationality
export const countryCodeLookUp = (nationality) => {
  return contries.find((country) => country?.Nationality === nationality)?.Code;
};
