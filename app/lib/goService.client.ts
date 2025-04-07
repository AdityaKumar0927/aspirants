import { request, gql } from "graphql-request";

const GO_SERVICE_ENDPOINT =
  process.env.GO_SERVICE_ENDPOINT || "http://localhost:8080/query";

const healthCheckQuery = gql`
  query {
    healthCheck
  }
`;

const generateQuestionsMutation = gql`
  mutation ($uploadID: ID!) {
    generateQuestions(uploadID: $uploadID) {
      id
      questionText
      options
      correctIndex
      answerExplanation
    }
  }
`;

interface HealthCheckResp {
  healthCheck: string;
}

interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  answerExplanation?: string;
}

interface GenerateQuestionsResp {
  generateQuestions: Question[];
}

export async function checkGoServiceHealth(): Promise<string> {
  const data = await request<HealthCheckResp>(GO_SERVICE_ENDPOINT, healthCheckQuery);
  return data.healthCheck;
}

export async function requestGenerateQuestions(uploadID: string): Promise<Question[]> {
  const data = await request<GenerateQuestionsResp>(GO_SERVICE_ENDPOINT, generateQuestionsMutation, {
    uploadID
  });
  return data.generateQuestions;
}
