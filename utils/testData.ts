import { departments, workingTypes, genders, bloodGroups, maritalStatuses, countries, timezones, employmentStatuses,designations,areas } from './constants';
import { faker } from '@faker-js/faker';

export const validEventData = {
  title: 'Automation Test Event',
  description: 'This is a test event created by Playwright.',
  link: 'https://example.com',
  date: generateTodayDate(),
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
  date: generateTodayDate(),
};

export const pastEventData = {
  title: 'Past Event',
  description: 'This event has a past date.',
  link: 'https://past-event-link.com',
  date: generateYesterdayDate(),
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

export const validCategoryData = {
  name: 'Automation Test Category',
};

export const invalidCategoryData = {
  name: '', // Name is required — this should trigger validation
};

export const validSubcategoryData = {
  name: 'Automation Test Subcategory',
};

export const validLinkData = {
  name: 'Automation Test Link',
  url: 'https://automation-test-link.com',
};

export const validHolidayData = {
  title: 'Automation Test Holiday',
  description: 'This is a test holiday created by Playwright.',
};

export const invalidHolidayData = {
  title: '', // Title is required — this should trigger validation
  description: 'Missing title field',
};

export function generateLeapfroggerData(referenceDate: string | Date = new Date()) {
  const firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, "");
  const middleName = faker.person.middleName().replace(/[^a-zA-Z]/g, "");
  const lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, "");
  const joinDate = generatePastJoinDate(referenceDate);

  const officialInfo = {
    firstName,
    middleName,
    lastName,
    joinDate,
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

export const existingUserData = {
  employeeEmail: 'oshingansi@lftechnology.com',
};

export const profileTestData = {
  searchName: 'Adam',
  employmentStatus: 'Intern',
  leaveIssuer: 'Cal',
  teamManager: 'Cal',
  designation: 'Senior Software Engineer',
  area: 'Development',
};


export function generatePastJoinDate(referenceDate: string | Date) {
  const baseDate = typeof referenceDate === 'string' ? new Date(referenceDate) : new Date(referenceDate);

  if (Number.isNaN(baseDate.getTime())) {
    throw new Error(`Invalid reference date provided: ${referenceDate}`);
  }

  const latestAllowedDate = new Date(baseDate);
  latestAllowedDate.setDate(latestAllowedDate.getDate() - 1);

  const earliestAllowedDate = new Date(baseDate);
  earliestAllowedDate.setFullYear(earliestAllowedDate.getFullYear() - 5);

  const pastDate = faker.date.between({
    from: earliestAllowedDate,
    to: latestAllowedDate,
  });

  return pastDate.toISOString().split('T')[0];
}

export function generateYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function generateTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function generateTodayDate() {
  const today = new Date();
  return today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}