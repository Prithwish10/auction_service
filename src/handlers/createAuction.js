import {v4 as uuid} from 'uuid'
import AWS from 'aws-sdk'

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString()
  }

  await dynamoDB.put({
    TableName: "AuctionTable",
    Item: auction
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ auction }),
  };
}

export const handler = createAuction;