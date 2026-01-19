
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