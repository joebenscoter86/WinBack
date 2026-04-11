import type { ReasonCodePromptTemplate } from "../types";
import { visa104Template } from "./visa-10.4";
import { visa131Template } from "./visa-13.1";
import { visa132Template } from "./visa-13.2";
import { visa133Template } from "./visa-13.3";
import { visa136Template } from "./visa-13.6";
import { mastercard4808Template } from "./mastercard-4808";
import { mastercard4853Template } from "./mastercard-4853";

const TEMPLATES: ReasonCodePromptTemplate[] = [
  visa104Template,
  visa131Template,
  visa132Template,
  visa133Template,
  visa136Template,
  mastercard4808Template,
  mastercard4853Template,
];

const templateMap = new Map<string, ReasonCodePromptTemplate>(
  TEMPLATES.map((t) => [`${t.network}:${t.reason_code}`, t])
);

export function getPromptTemplate(
  network: string,
  reasonCode: string
): ReasonCodePromptTemplate | undefined {
  return templateMap.get(`${network}:${reasonCode}`);
}

export { TEMPLATES };
