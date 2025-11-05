import { describe, it, expect } from 'vitest';
import { get } from '../../__tests__/utils';

describe('Routes (integration)', () => {
  it('should return OK on /health', async () => {
    const res = await get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });
});
