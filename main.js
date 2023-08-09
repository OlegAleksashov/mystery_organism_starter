// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length); // Get a random index
      let newBase = returnRandBase(); // Get a random DNA base

      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase(); // Keep generating new base until it's different
      }
      this.dna[randIndex] = newBase; // Assign the new base at the random index
      return this.dna;
    },
    
    compareDNA(pAequor) {
      let count = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === pAequor.dna[i]) {
          count++;
        }      
      }

      const percentage = ((count / this.dna.length) * 100).toFixed(2);
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common.`);
    },

    // This function searches base "C" or base "G" to calculate their percentage ratio
    willLikelySurvive() {
      let countC = 0;
      let countG = 0;
      for(let base of this.dna) {
        if(base === 'C') {
          countC++;
        } else if (base === 'G') {
          countG++;
        }      
      }
      const percentageC = ((countC / this.dna.length) * 100).toFixed(2);
      const percentageG = ((countG / this.dna.length) * 100).toFixed(2);

      return percentageC >= 60 || percentageG >= 60 ? true : false;
    }
  };
};

const tenaciousOrganism = [];
let count = 1;
while(tenaciousOrganism.length <= 30) {
  const newOrganism = pAequorFactory(count, mockUpStrand());
  if(newOrganism.willLikelySurvive() === true) {
    tenaciousOrganism.push(newOrganism);
  }
  count++;
}

const organism1 = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, mockUpStrand());
console.log(organism1.dna);
organism1.compareDNA(organism2);
console.log(organism1.willLikelySurvive());









