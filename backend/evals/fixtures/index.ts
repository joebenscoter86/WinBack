import type { Fixture } from "../types";
import { visa104Fixture } from "./visa-10.4";
import { visa131Fixture } from "./visa-13.1";
import { visa132Fixture } from "./visa-13.2";
import { visa133Fixture } from "./visa-13.3";
import { visa136Fixture } from "./visa-13.6";
import { mastercard4808Fixture } from "./mastercard-4808";
import { mastercard4853Fixture } from "./mastercard-4853";

export const fixtures: Fixture[] = [
  visa104Fixture,
  visa131Fixture,
  visa132Fixture,
  visa133Fixture,
  visa136Fixture,
  mastercard4808Fixture,
  mastercard4853Fixture,
];
