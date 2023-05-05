interface FetchGraph {
  operationsDoc: string;
  operationName: String;
  variables: Object;
}

interface FetchGraphResult {
  errors: object[] | null;
  data: object | null;
}

export async function queryHasuraGQL({
  operationsDoc,
  operationName,
  variables,
}: FetchGraph): Promise<FetchGraphResult> {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL ?? "", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJuYW1lIjoiam9zZSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNjgzOTEyMzcyLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiam9zZSIsIngtaGFzdXJhLW9yZy1pZCI6IjQ1NiJ9fQ.C9Tq4xR4rrkEFBqAHnFx39FYxhuj0Kw3xJvmVwt9EB4",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

