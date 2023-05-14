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

export async function isNewUser(token:string, issuer:string) {
  const operationsDoc = `
  query isNewUser ($issuer:String!){
    users(where: {issuer: {_eq: $issuer }}) {
      email
      id
      issuer
    }
  }
`;


const response = await queryHasuraGQL({
  operationsDoc,
  operationName: "isNewUser",
  variables: {
    issuer
  },
  token
});

console.log({response, issuer});
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

