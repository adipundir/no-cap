import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GET as listComments, POST as createComment } from '@/app/api/comments/route';
import { clearCommentRecords, listCommentsForFact } from '@/lib/store/comment-store';

const storeComment = vi.fn(async (comment: any) => ({
  commentId: comment.id,
  factId: comment.factId,
  comment,
  walrusMetadata: {
    blobId: 'blob-' + comment.id,
    size: JSON.stringify(comment).length,
    createdAt: new Date(),
  },
}));

vi.mock('@/lib/walrus-integration', () => {
  return {
    initializeWalrusFromEnv: vi.fn(() => ({
      initialize: vi.fn(async () => {}),
      storage: {
        storeComment,
      },
    })),
  };
});

describe('Comments API', () => {
  beforeEach(() => {
    clearCommentRecords();
    storeComment.mockClear();
  });

  it('POST /api/comments stores comment via Walrus', async () => {
    const payload = {
      id: 'comment-1',
      factId: 'fact-1',
      text: 'Context comment',
      author: 'anon',
      created: new Date().toISOString(),
      votes: 0,
    };

    const request = new Request('https://example.com/api/comments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const response = await createComment(request as any);
    expect(response.status).toBe(201);
    expect(storeComment).toHaveBeenCalledTimes(1);
    expect(listCommentsForFact('fact-1')).toHaveLength(1);
  });

  it('GET /api/comments returns comments for a fact', async () => {
    // First POST to store comment
    const payload = {
      id: 'comment-2',
      factId: 'fact-2',
      text: 'Another comment',
      author: 'anon',
      created: new Date().toISOString(),
      votes: 0,
    };

    const postRequest = new Request('https://example.com/api/comments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    await createComment(postRequest as any);

    const getRequest = new Request('https://example.com/api/comments?factId=fact-2');
    const response = await listComments({
      nextUrl: new URL(getRequest.url),
    } as any);
    const body = await response.json();
    expect(body.comments).toHaveLength(1);
    expect(body.comments[0].id).toBe('comment-2');
  });
});

