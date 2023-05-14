import { Metadata } from "@/pages/api/login";


interface FetchGraph {
  operationsDoc: string;
  operationName: String;
  variables: Object;
  token:string
}

interface FetchGraphResult {
  errors: object[] | null;
  data?:{
    users?: User[] | null;
  }
  } 


interface User {
  email: string;
  id: string;
  issuer: string;
}


export async function createNewUser(token:string, metadata:Metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

const { issuer, email, publicAddress } = metadata;
const response = await queryHasuraGQL({
  operationsDoc,
  operationName: "createNewUser",
  variables: {
    issuer,
    email,
    publicAddress,
  },
  token
});

console.log({response, issuer});
return response;
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
return response?.data?.users?.length === 0 ? true: false;
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

