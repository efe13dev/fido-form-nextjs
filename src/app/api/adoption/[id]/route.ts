import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN
});

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM animals WHERE id = ?',
      args: [id]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Animal not found' });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching animal:', error);
    return NextResponse.json({ error: 'Failed to fetch animal' });
  }
}
