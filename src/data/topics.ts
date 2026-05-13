// Topic taxonomy. Edit freely — add topics, add tags under them, share tags
// across topics. Tags here are matched against post tags by slug (case- and
// punctuation-insensitive), so "Machine Learning" and "machine-learning" both
// resolve to the same tag.
//
// A tag can appear under as many topics as fits. Posts are not affected:
// they declare their own `tags: [...]`; this file only changes how the
// /tags/ page groups them visually.

export interface Topic {
  slug: string;
  label: string;
  tags: string[];
}

export const topics: Topic[] = [
  {
    slug: 'ml',
    label: 'Machine learning',
    tags: ['transformers', 'attention', 'embeddings', 'training', 'eval'],
  },
  {
    slug: 'data',
    label: 'Data',
    tags: ['pipelines', 'eval', 'embeddings', 'sql', 'parquet'],
  },
  {
    slug: 'meta',
    label: 'Meta',
    tags: ['meta', 'intro', 'reflection'],
  },
];
