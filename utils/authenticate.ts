import { APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://qa.vyaguta.lftechnology.com.np';

export async function fetchTokens(
  request: APIRequestContext
): Promise<{ accessToken: string; refreshToken: string }> {
  const clientId = process.env.CLIENT_ID;
  const token = process.env.TOKEN;

  if (!clientId || !token) {
    throw new Error('CLIENT_ID or ACCESS_CODE is not defined in .env');
  }

  const response = await request.get(`${BASE_URL}/api/auth/authorize`, {
    params: { clientId, token },
  });

  if (!response.ok()) throw new Error(`Failed to fetch token: ${response.status()}`);
  
  const json = await response.json();
  return {
    accessToken: json.data.accessToken,
    refreshToken: json.data.refreshToken,
  };
}
