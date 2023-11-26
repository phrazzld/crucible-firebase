import * as admin from 'firebase-admin';
import * as logger from "firebase-functions/logger";
import { onCall, onRequest } from 'firebase-functions/v2/https';
import serviceAccount from '../service-account-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  logger.info("request:", request)

  response.send("Hello from Firebase!");
});

const callMeMaybe = onCall(async (request) => {
  logger.info("callMeMaybe:", request)

  return {
    data: "Hello from Firebase!",
    ps: "I just met you",
  }
})

exports.callMeMaybe = callMeMaybe;
exports.helloWorld = helloWorld;
