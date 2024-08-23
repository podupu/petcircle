import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import { pet } from "../../utils/petData";

const ajv = new Ajv();

test.describe("Pet endpoint : POST Method", () => {
  test("should create a new pet", async ({ request }) => {
    const startTime = Date.now();
    const response = await request.post("pet", {
      data: pet,
    });
    const endTime = Date.now();

    // Status code check
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Response body structure check
    expect(responseBody).toBeTruthy();
    expect(responseBody.id).toBe(pet.id);
    expect(responseBody).toEqual(pet);

    // Content-type check
    expect(response.headers()["content-type"]).toBe("application/json");

    // Response time check
    expect(endTime - startTime).toBeLessThan(2000);
  });

  test("should not create a new pet as some required fields are missing", async ({
    request,
  }) => {
    const response = await request.post("pet", {
      data: {
        name: "new pet",
      },
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(400);

    expect(responseBody).not.toEqual(pet);

    expect(responseBody.error).toBeDefined();
  });

  test("should not create a new pet as request body is empty", async ({
    request,
  }) => {
    const response = await request.post("pet", {
      data: {},
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(400);

    expect(responseBody.error).toBeDefined();
  });

  test("should validate schema of the response", async ({ request }) => {
    const response = await request.post("pet", {
      data: pet,
    });

    const responseBody = await response.json();

    // Schema validation
    const schema = {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        status: { type: "string" },
      },
      required: ["id", "name", "status"],
    };
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);

    expect(valid).toBe(true);
  });

  test("should check authentication", async ({ request }) => {
    const response = await request.post("pet", {
      data: pet,
      headers: {
        Authorization: "Bearer invalid_token",
      },
    });

    expect(response.status()).toBe(401);
  });

  test("should check data persistence", async ({ request }) => {
    const createResponse = await request.post("pet", {
      data: pet,
    });

    const responseBody = await createResponse.json();

    const getResponse = await request.get(`pet/${responseBody.id}`);
    const getResponseBody = await getResponse.json();

    expect(getResponseBody).toEqual(pet);
  });
});
