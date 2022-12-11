import { MonoSynth } from "tone";

export default class Synthesiser {
  constructor() {}

  synth = new MonoSynth({
    oscillator: {
      type: "square",
    },
    envelope: {
      attack: 0.1,
    },
  }).toDestination();

  play = () => {
    this.synth.triggerAttackRelease("C4", "8n");
  };
}
