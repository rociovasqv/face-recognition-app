export const generateDefaultPassword = (firstName, lastName, dni) => {
    const dniLastThreeDigits = dni.slice(-3);
    const firstNameFirstTwoDigits = firstName.slice(0, 2);
    const lastNameFirstTwoDigits = lastName.slice(0, 2);
    return `${firstNameFirstTwoDigits}${lastNameFirstTwoDigits}${dniLastThreeDigits}`;
};