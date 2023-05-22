import { Metadata } from "@/pages/api/login";

interface FetchGraph {
  operationsDoc: string;
  operationName: String;
  variables: Object;
  token: string;
}

interface FetchGraphResult {
  errors: object[] | null;
  data?: {
    users?: User[] | null;
    stats?: User[];
  };
}

interface User {
  email: string;
  id: string;
  issuer: string;
}

interface Stats {
  favourited: number;
  userId: string;
  watched: boolean;
  videoId: string;
}

export async function insertStats(
  token: string,
  { favourited, userId, watched, videoId }: Stats
) {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      watched: $watched, 
      videoId: $videoId
    }) {
        favourited
        id
        userId
    }
  }
`;

  return await queryHasuraGQL({
    operationsDoc,
    operationName: "insertStats",
    variables: {
      favourited,
      userId,
      watched,
      videoId,
    },
    token,
  });
}
export async function updateStats(
  token: string,
  { favourited, userId, watched, videoId }: Stats
) {
  const operationsDoc = `
mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
  update_stats(
    _set: {watched: $watched, favourited: $favourited}, 
    where: {
      userId: {_eq: $userId}, 
      videoId: {_eq: $videoId}
    }) {
    returning {
      favourited,
      userId,
      watched,
      videoId
    }
  }
}
`;

  const response = await queryHasuraGQL({
    operationsDoc,
    operationName: "updateStats",
    variables: {
      favourited,
      userId,
      watched,
      videoId,
    },
    token,
  });

  return response;
}

export async function findVideoIdByUser(
  userId: string,
  videoId: string,
  token: string
) {
  const operationsDoc = `query findVideoIdByUserId ($userId: String!, $videoId: String!){
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      userId
      videoId
      favourited
      watched
    }
  }
`;

  const response = await queryHasuraGQL({
    operationsDoc,
    operationName: "findVideoIdByUserId",
    variables: {
      videoId,
      userId,
    },
    token,
  });

  const length = response?.data?.stats?.length || 0;
  return length > 0;
}

export async function createNewUser(token: string, metadata: Metadata) {
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
    token,
  });

  console.log({ response, issuer });
  return response;
}

export async function isNewUser(token: string, issuer: string) {
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
      issuer,
    },
    token,
  });

  console.log({ response, issuer });
  return response?.data?.users?.length === 0 ? true : false;
}

export async function queryHasuraGQL({
  operationsDoc,
  operationName,
  variables,
  token,
}: FetchGraph): Promise<FetchGraphResult> {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL ?? "", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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
