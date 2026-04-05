import { visa104 } from "./visa-10.4";
import { visa131 } from "./visa-13.1";
import { visa132 } from "./visa-13.2";
import { visa133 } from "./visa-13.3";
import { visa136 } from "./visa-13.6";
import { mastercard4808 } from "./mastercard-4808";
import { mastercard4853 } from "./mastercard-4853";
import type { PlaybookData } from "../types";

export const ALL_PLAYBOOKS: PlaybookData[] = [
  visa104,
  visa131,
  visa132,
  visa133,
  visa136,
  mastercard4808,
  mastercard4853,
];
