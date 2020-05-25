export const getDateOfBirth = (patient) => patient.birthDate;

export const getName = (patient) => {
  const lastName = patient.name[0].family;
  const firstName = patient.name[0].given.join(' ');
  return `${firstName} ${lastName}`;
};