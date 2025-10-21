import { strategies } from "./strategies";

const DEFAULT_CONFIG = {
  maxRounds: 20,
  delay: 1000,
  payoffMatrix: {
    CC: [3, 3],
    CD: [0, 5],
    DC: [5, 0],
    DD: [1, 1],
  },
  defaultStratOne: strategies[0],
  defaultStratTwo: strategies[1],
};

export default DEFAULT_CONFIG;
