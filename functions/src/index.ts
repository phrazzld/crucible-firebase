import 'dotenv/config';
import * as admin from 'firebase-admin';
import * as logger from "firebase-functions/logger";
import { onCall } from 'firebase-functions/v2/https';
import serviceAccount from '../service-account-key.json';
import { openai } from './openai';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

const runConfigTrial = onCall(async (request) => {
  const { config } = request.data;
  const { model, maxTokens, temperature, frequencyPenalty, presencePenalty, systemPrompt, userPrompt } = config;
  logger.info("config:", config)

  const openaiResponse = await openai.chat.completions.create({
    user: request.auth?.uid,
    model,
    max_tokens: maxTokens,
    temperature,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ]
  })

  const response = openaiResponse.choices[0].message?.content?.trim() || ""
  logger.info("response:", response)

  return {
    response
  }
})

exports.runConfigTrial = runConfigTrial;
