import { APIRequestContext } from '@playwright/test';

export async function createPet(request: APIRequestContext, pet: any) {
  const response = await request.post('pet', { data: pet });
  if (response.status() !== 200) {
    throw new Error(`Failed to create pet: ${response.status()}`);
  }
  return response;
}

export async function deletePet(request: APIRequestContext, petId: number) {
  const response = await request.delete(`pet/${petId}`);
  if (response.status() !== 200) {
    throw new Error(`Failed to delete pet: ${response.status()}`);
  }
  return response;
}
