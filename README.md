# Prisoner’s Dilemma Visualization

An interactive web-based simulation for exploring strategies in the Iterated Prisoner’s Dilemma.

Website: https://prisoners-dilemma-visualized.com/ (/website_ss.png)

## Features

- Interactive Prisoner’s Dilemma payoff visualization
- Multiple built-in strategies (Tit-for-Tat, Grim, Random, etc.)
- Configurable number of rounds
- Optional noise (miscommunication)
- Real-time score tracking
- Comparative charts of strategies

## How It Works

- Each match simulates repeated rounds of Prisoner’s Dilemma
- Strategies decide between Cooperate (C) or Defect (D) each round
- Payoffs are calculated using a fixed payoff matrix
- Scores accumulate over time and are displayed live

## Strategies Included

A few of the strategies included

| Name             | Description                                       |
| ---------------- | ------------------------------------------------- |
| Alternator       | Alternates between cooperating and defecting      |
| Always Cooperate | Always chooses to cooperate                       |
| Always Defect    | Always chooses to defect                          |
| Random           | Randomly plays “C” or “D” each round              |
| Tit-for-Tat      | Starts with “C”, then copies opponent’s last move |

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite

## Resources & Further Reading

Axelrod's Book on the 1980 Tournament.

    [A short introudction to the book](https://ee.stanford.edu/~hellman/Breakthrough/book/pdfs/axelrod.pdf)

    [The Evolution of Cooperation](https://www.goodreads.com/book/show/366821.The_Evolution_of_Cooperation)

Stanford has a great overview of game theory
[Website by Stanford on Game Theory and Prisoner's Dilemma.](https://cs.stanford.edu/people/eroberts/courses/soco/projects/1998-99/game-theory/index.html)

Watch this excellent video on game theory and the Cold War

    Was a big inspiration for this website.

    [This game theory problem will change the way... By Veritasium](https://youtu.be/mScpHTIi-kM?si=QsxGZ82lAhnTP7yk)

For coders: try this Python library with 230+ strategies. A python library for simulating Axelrod's Tournament. Has over 230 strategies even including ANN’s.

    Github: [https://github.com/Axelrod-Python/Axelrod/tree/dev](https://github.com/Axelrod-Python/Axelrod/tree/dev)

    Docs: [https://axelrod.readthedocs.io/en/latest/index.html](https://axelrod.readthedocs.io/en/latest/index.html)

Play an interactive game about trust and cooperation

    THE EVOLUTION OF TRUST: [https://ncase.me/trust/](https://ncase.me/trust/)
