import { faker } from '@faker-js/faker';

export const generateFakePeople = (count) => {
  const people = [];

  for (let i = 0; i < count; i++) {
    const person = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      jobTitle: faker.person.jobTitle(),
      phoneNumber: faker.phone.number(),
      team: faker.company.catchPhrase(), // Example alternative
      role: faker.person.jobType(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
      },
      avatar: faker.image.avatar(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0], // Random DOB between 18-65 years old
      gender: faker.person.sexType(), // Generates random gender
      nationality: faker.location.country(), // Generates random country as nationality
      contactNo: faker.phone.number(), // Generates a random phone number
    };

    people.push(person);
  }

  return people;
};

export const fakePeopleData = generateFakePeople(100);
