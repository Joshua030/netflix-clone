interface FetchGraph {
  operationsDoc: string;
  operationName: String;
  variables: Object;
  token:string
}

interface FetchGraphResult {
  errors: object[] | null;
  users?: User[] | null;
  } 


interface User {
  email: string;
  id: string;
  issuer: string;
}

export async function isNewUser(token:string) {
  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "did:ethr:0x1d8E5eEDEeB74751c100272A93b929B243665c39"}}) {
      email
      id
      issuer
    }
  }
`;

const response = await queryHasuraGQL({
  operationsDoc,
  operationName: "MyQuery",
  variables: {},
  token
});

console.log({response});
return response?.users?.length === 0 ? true: false;
}

export async function queryHasuraGQL({
  operationsDoc,
  operationName,
  variables,
  token
}: FetchGraph): Promise<FetchGraphResult> {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL ?? "", {
    method: "POST",
    headers: {
      Authorization:
      `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

function fetchMyQuery() {
  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "did:ethr:0x1d8E5eEDEeB74751c100272A93b929B243665c39"}}) {
      email
      id
      issuer
    }
  }
`;
  return queryHasuraGQL({
    operationsDoc,
    operationName: "MyQuery",
    variables: {},
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDFkOEU1ZUVERWVCNzQ3NTFjMTAwMjcyQTkzYjkyOUIyNDM2NjVjMzkiLCJwdWJsaWNBZGRyZXNzIjoiMHgxZDhFNWVFREVlQjc0NzUxYzEwMDI3MkE5M2I5MjlCMjQzNjY1YzM5IiwiZW1haWwiOiJqb3NlbHV5MTIzQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJ3YWxsZXRzIjpbXSwiaWF0IjoxNjgzODQxOTc2LCJleHAiOjE2ODQ0NDY3NzYsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDFkOEU1ZUVERWVCNzQ3NTFjMTAwMjcyQTkzYjkyOUIyNDM2NjVjMzkifX0.gPaRVU4y0TJG3awd7Mr9KTU2IDNLhdQL-jiuUowNO_8"
  });
}
export async function startFetchMyQuery() {
  const { errors, users } = await fetchMyQuery();
  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }
  // do something great with this precious data
  console.log(users);
}
// startFetchMyQuery();