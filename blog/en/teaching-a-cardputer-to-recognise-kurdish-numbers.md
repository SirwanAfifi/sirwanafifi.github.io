# Teaching a Cardputer to Recognise Kurdish Numbers

A weekend experiment training a 2,405-parameter neural network to recognise 1, 2, and 3 in Ardalani Kurdish, running entirely offline on a Cardputer.

- Published: 2026-10-01
- Language: en
- Tags: Cardputer, ESP32, Machine Learning, Kurdish
- Canonical: https://sirwan.info/blog/en/teaching-a-cardputer-to-recognise-kurdish-numbers

---

import NeuralNetworkDiagram from "../../../components/cardputer/NeuralNetworkDiagram.astro";

Over the weekend, I spent some time experimenting with an [ESP32](/blog/en/visualising-your-iot-data/)-based Cardputer. I wanted to see if I could train a small neural network and get it running on the device, using recordings of my own voice.

<NeuralNetworkDiagram />

What I ended up with is a simple audio classifier that recognises me saying **1, 2, and 3 in Ardalani Kurdish**. The network has just **2,405 parameters**.

I recorded the examples, trained the model from scratch on my Mac, and then put it on the Cardputer. Once it’s installed, the device handles the audio processing and predictions entirely offline. Press Enter, say a number, wait a moment, and the result appears on the screen.

<img src="/img/cardputer/cardputer.jpg" alt="Cardputer resting on a laptop, with the Kurdish number classifier prompting me to say 1, 2, or 3." width="400" height="416" style="width: 100%; max-width: 400px; height: auto; margin-inline: auto;" />

Getting there involved a fair amount of recording, listening back, and trying again. Even before training, I needed to check that the microphone was capturing usable audio. Testing the model with fresh recordings brought its own surprises: sometimes it recognised the number correctly, and sometimes it showed “Unsure.”

It’s still a small experiment, and recognition needs more work. But going through the whole process made the pieces much easier to understand: collecting examples, training a model, and seeing how it behaves when I actually use it.

The most satisfying part was saying a number in Kurdish and seeing it appear on that tiny screen, with the model running right there on the device.
