import { departments, workingTypes, genders, bloodGroups, maritalStatuses, countries, timezones, employmentStatuses,designations,areas } from './constants';
import { faker } from '@faker-js/faker';

export const validEventData = {
  title: 'Automation Test Event',
  description: 'This is a test event created by Playwright.',
  link: 'https://example.com',
//   eventDate: '2025-07-05',
};

export const validNoticeData = {
  title: 'Automation Test Notice',
  description: 'This is a test notice created by Playwright.',
  link: 'https://example.com',
};

export const invalidNoticeData = {
  title: '', // Title is required — this should trigger validation
  description: 'Missing title field',
  link: 'https://example.com',
};

export const invalidEventData = {
  title: '', // Name is required — this should trigger validation
  description: 'Missing name field',
  link: 'https://example.com',
//   eventDate: '2025-07-05',
};

export const validWorklogData = {
  project: 'Project A',
  task: 'Task 1',
  details: 'Worked on task 1',
  time: '8h 0m',
};

export const invalidWorklogData = {
  project: '', // Project is required — this should trigger validation
  task: 'Task 1',
  details: 'Worked on task 1',
  time: '8h 0m',
};

export const validReminderData = {
  title: 'Automation Test Reminder',
  description: 'This is a test reminder created by Playwright.',
  link: 'https://example.com',
//   eventDate: '2025-07-05',
};

export const invalidReminderData = {
  title: '', // Title is required — this should trigger validation
  description: 'Missing title field',
  link: 'https://example.com',
};

export const validHolidayData = {
  title: 'Automation Test Holiday',
  description: 'This is a test holiday created by Playwright.',
};

export const invalidHolidayData = {
  title: '', // Title is required — this should trigger validation
  description: 'Missing title field',
};

export function generateLeapfroggerData() {
  const firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, "");
  const middleName = faker.person.middleName().replace(/[^a-zA-Z]/g, "");
  const lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, "");

  const officialInfo = {
    firstName,
    middleName,
    lastName,
    joinDate: faker.date.past({ years: 2 }).toISOString().split('T')[0],
    recruiteeUrl: faker.internet.url(),
    employeeEmail: `${firstName}${lastName}@test.com`.toLowerCase(),
    previousExperienceYear: faker.number.int({ min: 0, max: 20 }).toString(),
    previousExperienceMonth: faker.number.int({ min: 0, max: 11 }).toString(),
    cvUrl: faker.internet.url(),
    workingType: faker.helpers.arrayElement(workingTypes),
    department: faker.helpers.arrayElement(departments),
  };

  const personalInfo = {
    gender: faker.helpers.arrayElement(genders),
    dateOfBirth: faker.date.birthdate({ min: 1970, max: 2000, mode: 'year' }).toISOString().split('T')[0],
    bloodGroup: faker.helpers.arrayElement(bloodGroups),
    maritalStatus: faker.helpers.arrayElement(maritalStatuses),
    personalEmail: faker.internet.email(),
    phoneNumber: faker.string.numeric(10),
    alternatePhoneNumber: faker.string.numeric(10),
    emergencyContactNumber: faker.string.numeric(10),
    relationWithEmergencyContact: faker.person.firstName(),
    temporaryAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
    country: faker.helpers.arrayElement(countries),
    timezone: faker.helpers.arrayElement(timezones),
    githubId: `${firstName}${lastName}test`.toLowerCase(),
  };

  const historyInfo = {
    employmentStatus: faker.helpers.arrayElement(employmentStatuses),
    employmentStatusStartDate: officialInfo.joinDate,
    designation: faker.helpers.arrayElement(designations),
    area: faker.helpers.arrayElement(areas),
    transitionDate: officialInfo.joinDate,

  };

  return { officialInfo, personalInfo, historyInfo };
}

