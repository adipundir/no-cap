import type { Fact, FactTag, FullFact } from '@/types/fact';

const STOP_WORDS = new Set([
  'the','and','for','with','that','from','this','have','been','were','will','their','about','which','into','over','after','before','being','under','between','within','without','they','them','those','these','there','here','such','than','then','when','while','where','what','your','yours','ours','ourselves','hers','herself','him','himself','her','how','why','who','whom','whose','can','could','should','would','shall','might','must','may','also','very','more','less','than','each','other','most','least','among','because','during','across','using','used','per','via'
]);

const MAX_KEYWORDS = 32;

function normalizeTagInput(tag: FactTag | string): FactTag {
  if (typeof tag === 'string') {
    return {
      name: tag.trim().toLowerCase(),
      category: 'custom',
    };
  }

  return {
    ...tag,
    name: tag.name.trim().toLowerCase(),
    category: tag.category,
  };
}

export function normalizeTags(tags?: (FactTag | string)[]): FactTag[] {
  if (!tags || tags.length === 0) {
    return [];
  }

  const seen = new Map<string, FactTag>();

  tags
    .map(normalizeTagInput)
    .forEach((tag) => {
      const key = `${tag.category}:${tag.name}`;
      if (!seen.has(key)) {
        seen.set(key, {
          ...tag,
          addedAt: tag.addedAt ? new Date(tag.addedAt) : undefined,
        });
      }
    });

  return Array.from(seen.values());
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));
}

interface KeywordSource {
  title: string;
  summary: string;
  fullContent?: string;
  tags?: FactTag[];
  keywords?: string[];
}

export function generateKeywords(source: KeywordSource): string[] {
  const keywordSet = new Set<string>();

  const addKeyword = (value: string | undefined) => {
    if (!value) return;
    const cleaned = value.toLowerCase().trim();
    if (cleaned.length >= 3 && !STOP_WORDS.has(cleaned)) {
      keywordSet.add(cleaned);
    }
  };

  [source.title, source.summary, source.fullContent]
    .filter(Boolean)
    .forEach((text) => {
      tokenize(text as string).forEach(addKeyword);
    });

  source.tags?.forEach((tag) => {
    addKeyword(tag.name);
  });

  source.keywords?.forEach(addKeyword);

  return Array.from(keywordSet).slice(0, MAX_KEYWORDS);
}

function deriveCategories(tags: FactTag[]): string[] | undefined {
  if (!tags || tags.length === 0) {
    return undefined;
  }

  const categories = new Set<string>();
  tags.forEach((tag) => {
    if (tag.category) {
      categories.add(tag.category);
    }
  });

  if (categories.size === 0) {
    return undefined;
  }

  return Array.from(categories);
}

function ensureDate(value?: Date | string): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function normalizeFullFact(input: FullFact): FullFact {
  const metadataTags = normalizeTags(input.metadata?.tags);
  const updated = ensureDate(input.metadata.updated) ?? new Date();
  const created = ensureDate(input.metadata.created) ?? updated;
  const lastModified = ensureDate(input.metadata.lastModified) ?? updated;

  const keywords = generateKeywords({
    title: input.title,
    summary: input.summary,
    fullContent: input.fullContent,
    tags: metadataTags,
    keywords: input.metadata.keywords,
  });

  const normalizedMetadata = {
    ...input.metadata,
    author: input.metadata.author,
    created,
    updated,
    lastModified,
    tags: metadataTags,
    keywords,
    categories: input.metadata.categories ?? deriveCategories(metadataTags),
  };

  return {
    ...input,
    metadata: normalizedMetadata,
  };
}

export function normalizeFact(fact: Fact): Fact {
  if (!fact.metadata) {
    return fact;
  }

  const metadataTags = normalizeTags(fact.metadata.tags);

  const keywords = generateKeywords({
    title: fact.title,
    summary: fact.summary,
    tags: metadataTags,
    keywords: fact.metadata.keywords,
  });

  const normalizedMetadata = {
    ...fact.metadata,
    created: ensureDate(fact.metadata.created) ?? new Date(),
    updated: ensureDate(fact.metadata.updated) ?? new Date(),
    lastModified: ensureDate(fact.metadata.lastModified) ?? new Date(),
    tags: metadataTags,
    keywords,
    categories: fact.metadata.categories ?? deriveCategories(metadataTags),
  };

  return {
    ...fact,
    metadata: normalizedMetadata,
  };
}

