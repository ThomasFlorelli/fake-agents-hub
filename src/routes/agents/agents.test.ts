import { describe, it, expect, beforeAll } from 'vitest';
import { get, post, put, del, waitForApi } from '../../__tests__/utils';

describe('Agents routes (integration)', () => {
  beforeAll(async () => {
    await waitForApi();
  });

  it('should list agents on GET /agents', async () => {
    const res = await get('/agents');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContainEqual(expect.objectContaining({ id: expect.any(String), name: expect.any(String) }));
  });

  it('Should create an agent on demand', async () => {
    const res = await post('/agents', { name: 'Test Agent' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toMatchObject({ id: expect.any(String), name: expect.any(String), agentType: expect.objectContaining({ id: expect.any(String), replies: expect.any(Object) }) });
  });

  it.skip('should create, read, update and delete an agent (persistence)', async () => {
    const createRes = await post('/agents', { name: 'Integration Agent' });
    expect(createRes.status).toBe(201);
    const created = createRes.body;
    expect(created).toHaveProperty('id');
    expect(created.name).toBe('Integration Agent');

    const id = created.id;

    const listRes = await get('/agents');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    const found = listRes.body.find((a: any) => a.id === id);
    expect(found).toBeTruthy();

    const readRes = await get(`/agents/${id}`);
    expect(readRes.status).toBe(200);
    expect(readRes.body).toHaveProperty('id', id);

    const updateRes = await put(`/agents/${id}`, { name: 'Updated Agent' });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty('id', id);
    expect(updateRes.body.name).toBe('Updated Agent');

    const delRes = await del(`/agents/${id}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body).toEqual({ id: id, deleted: true });

    const afterList = await get('/agents');
    expect(afterList.status).toBe(200);
    const still = afterList.body.find((a: any) => a.id === id);
    expect(still).toBeFalsy();
  });
});
