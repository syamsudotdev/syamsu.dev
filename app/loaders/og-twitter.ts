type OpenGraphTwitterMeta = {
  title: string;
  description: string;
  imagePath: string;
};

export function buildOpenGraphTwitterMeta({
  title,
  description,
  imagePath,
}: OpenGraphTwitterMeta) {
  return [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@syamsudotdev' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:image',
      content: `https://syamsu.dev/meta/${imagePath}`,
    },
  ];
}
