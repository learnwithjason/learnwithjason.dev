export default {
  name: 'guest',
  type: 'document',
  title: 'Guest',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'twitter',
      type: 'string',
      title: 'Twitter',
      description: 'Just the username, no @ or URL (e.g. “jlengstorf”).',
    },
  ],
};
