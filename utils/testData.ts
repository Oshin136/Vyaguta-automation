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

