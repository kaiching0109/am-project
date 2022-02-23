const USERS = [
  { label: 'Joyse', value: 'Joyse' },
  { label: 'Sam', value: 'Sam' },
  { label: 'Russell', value: 'Russell' },
];

const CHANNELS = [
  { id: '1', label: 'General', value: 'General' },
  { id: '2', label: 'Technology', value: 'Technology' },
  { id: '3', label: 'LGTM', value: 'LGTM' },
];

const TEXT = {
  APP_TEXT_TITLE: '1 day chat App',
  APP_TEXT_DESCRIPTION: 'All messages will be deleted at every 00:00 UTC',
  SIDE_PANE_TEXT_STEP_1: '1. Choose your user',
  SIDE_PANE_TEXT_STEP_2: '2. Choose your Channel',
  TEXTAREA_TEXT_PLACEHOLDER: 'Type your message here...',
  BUTTON_TEXT_READ_MORE: 'Read More',
  BUTTON_TEXT_SEND: 'Send Message',
};

const URL = {
  API: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
};

export default {
  USERS,
  CHANNELS,
  TEXT,
  URL,
};
