import { strategies } from "./strategies";

const DEFAULT_CONFIG = {
  maxRounds: 10,
  delay: 1500,
  noise: false,
  noiseChance: 0.05,
  payoffMatrix: {
    CC: [3, 3],
    CD: [0, 5],
    DC: [5, 0],
    DD: [1, 1],
  },
  defaultStratOne: strategies[1], //Should be Always Cooperate
  defaultStratTwo: strategies[2], //Should be Always Defect
};

export default DEFAULT_CONFIG;
