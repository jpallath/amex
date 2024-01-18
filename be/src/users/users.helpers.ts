export const generateUser = (user) => {
  const profileImage = user.picture.large;
  const name = user.name.first + ' ' + user.name.last;
  const age = user.dob.age;
  const fullAddress = getAddress(user.location);
  const emailAddress = user.email;
  const dateOfBirth = user.dob.date;
  const phoneNumber = user.phone;
  return {
    profileImage,
    name,
    age,
    fullAddress,
    emailAddress,
    dateOfBirth,
    phoneNumber,
  };
};

const getAddress = (location) => {
  const streetAddress =
    location.street.number.toString() + ' ' + location.street.name;
  const city = location.city;
  const state = location.state;
  const country = location.country;
  const postcode = location.postcode.toString();
  return { streetAddress, city, state, country, postcode };
};
