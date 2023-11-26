import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
/* import { onCall } from "firebase-functions/v2/https"; */

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  logger.info("request:", request)

  response.send("Hello from Firebase!");
});
