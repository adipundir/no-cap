import type { ContextComment } from '@/types/fact';
import type { WalrusBlobMetadata } from '@/types/walrus';

export type StoredCommentRecord = {
  comment: ContextComment;
  walrusBlobId: string;
  walrusMetadata: WalrusBlobMetadata;
  availabilityCertificate?: string;
};

const commentRecords = new Map<string, StoredCommentRecord>();
const commentsByFact = new Map<string, Set<string>>();

export function upsertCommentRecord(record: StoredCommentRecord): void {
  commentRecords.set(record.comment.id, record);
  if (!commentsByFact.has(record.comment.factId)) {
    commentsByFact.set(record.comment.factId, new Set());
  }
  commentsByFact.get(record.comment.factId)!.add(record.comment.id);
}

export function getCommentRecord(id: string): StoredCommentRecord | undefined {
  return commentRecords.get(id);
}

export function listCommentsForFact(factId: string): StoredCommentRecord[] {
  const ids = commentsByFact.get(factId);
  if (!ids) return [];
  return Array.from(ids).map((id) => commentRecords.get(id)!);
}

export function clearCommentRecords(): void {
  commentRecords.clear();
  commentsByFact.clear();
}
