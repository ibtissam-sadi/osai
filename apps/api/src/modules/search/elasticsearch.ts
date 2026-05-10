export const buildArchiveSearchQuery = (q: string, filters: Record<string, unknown> = {}) => ({
  index: 'documents',
  query: {
    bool: {
      must: [
        {
          multi_match: {
            query: q,
            fields: ['title^3', 'description', 'metadata.*', 'ocrText']
          }
        }
      ],
      filter: Object.entries(filters).map(([field, value]) => ({ term: { [field]: value } }))
    }
  },
  knn: {
    field: 'embedding',
    k: 15,
    num_candidates: 120
  }
});
