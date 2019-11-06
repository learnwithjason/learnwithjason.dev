export default {
  name: 'episode',
  type: 'document',
  title: 'Episode',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      title: 'Hide this episode on the website',
      name: 'hidden',
      type: 'boolean',
      options: { layout: 'checkbox' },
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'What should the URL-friendly name of this episode be?',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      type: 'episodeImage',
      title: 'Image',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Episode Description',
      description: 'For Google SEO, previews, etc. — a brief overview.',
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Episode Date',
    },
    {
      name: 'guest',
      type: 'array',
      title: 'Guest(s)',
      of: [{ type: 'reference', to: [{ type: 'guest' }] }],
    },
    {
      name: 'youtubeID',
      type: 'string',
      title: 'YouTube ID',
      description: 'Just the ID, not the full URL.',
    },
    {
      name: 'demo',
      type: 'url',
      title: 'Demo URL',
      description: 'Where can people see the result of this episode online?',
    },
    {
      name: 'repo',
      type: 'url',
      title: 'Repo URL',
      description: 'Where can people see the source code?',
    },
    {
      name: 'links',
      type: 'array',
      title: 'Links and Resources',
      description: 'Links to anything that was mentioned during the episode.',
      of: [{ type: 'url' }],
    },
    {
      name: 'transcript',
      type: 'markdown',
      title: 'Transcript',
      description: 'Get this from rev.com as a .txt file.',
    },
  ],
};
