# Prisoner's Dilemma Visualization

An interactive demonstration of Prisoner's Dilemma. Test strategies against each other in real time to see which performs the best.

## **What is the Prisoner’s Dilemma?**

Prisoner's Dilemma is a classic example used in Game Theory. What is Game Theory? Game theory is the study of strategic decision-making in situations where the outcome depends on the choices of all participants. In simple terms, it's a way to analyze situations with multiple "players" who must make a choice, like a game of chess or two companies competing on price, where one person's action affects the outcome for everyone.

For this example, we have two players/strategies. A strategy wins by accumulating the most points. In each round, a strategy will choose whether to cooperate or defect. We can represent the payoff in a 2x2 matrix. The payoff is represented as x/y, where Strategy 1 is x and Strategy 2 is y. Thus, we can now calculate the payoff for a round

Ex: Strategy 1 cooperates and Strategy 2 cooperates, then each gets 3 points.

Ex: Strategy 1 defects and Strategy 2 cooperates; then Strategy 1 gets 5 points and Strategy 2 gets 0 points (5/0).

|               | Cooperate | Defect |
| :------------ | :-------- | :----- |
| **Cooperate** | 3/3       | 0/5    |
| **Defect**    | 5/0       | 1/1    |

Okay, now let's play one round between me and you. What's the best choice for you to make in this one-round match? I’ll give you a few seconds to think… did you say defect? If you did, that's a smart move. You probably thought, “_if I choose to cooperate, then he might defect and I would be left with nothing, so defecting guarantees me at least one point_”. Well, guess what… I thought the same thing and also defected. So now we're both given one point.

Now let's play again, however we will play for let's say 10 rounds. So what's your first move? Remember, we want to maximize our points. Okay, I choose to cooperate. What did you choose? Let's say you were nice and also cooperated. That gives us both 3 points. Next round, I choose to cooperate this round again. Maybe this time you think well, he seems to be nice, so this time I’ll take advantage of him and defect. Damn, you now have 8 points, and I only have 3 points. Okay, next round, well, since you screwed me last time, I'll do the same move you did and defect. Maybe you also thought he’ll probably defect since I did last time, and now it's 9-4. And the game continues since we can’t trust each other, we both defect for the rest of the match, giving the total score of 16-11. See how introducing more iterations makes the choices ever more important. If we just always defect, we won't get close to the maximum points we ought to if we had cooperated. Maybe now you can see how important it is to study this.

## **History/Application**

In 1980, Robert Axelrod created a Prisoner's Dilemma tournament, commonly known as Axelrod's Tournament.[^1] Various well-known game theorists submitted strategies to face off against each other. The winner of the tournament was Tit-for-Tat. The strategy was to start with cooperating, then copy the opponent's last move. This was if the opponent had good intentions (wants to cooperate), then Tit-for-Tat would do the same. However, it would also be defective only if the other player did the same. Axelrod concluded that cooperation can emerge and thrive if strategies have the following three characteristics:

1. Nice: Successful strategies never initiated defection, meaning they started by cooperating. This prevented them from getting into unnecessary trouble and built trust.

2. Retaliatory: Strategies had to retaliate against an opponent's defection to discourage repeated defections.

3. Forgiving: After an opponent defected and was punished, a successful strategy would return to cooperation as soon as the opponent did, preventing long, mutually destructive cycles of revenge.

> _Note: “It must be realized that there really is no "best" strategy for prisoner's dilemma.  
> Each individual strategy will work best when matched against a "worse" strategy.  
> In order to win, a player must figure out the opponent's strategy and then pick a strategy that is best suited for the situation.”_ [^2]

These three concepts have valuable implications that can be used in real life. Whether you are negotiating a car deal or the CEO of a company, these rules can help to derive cooperation and success in many situations.

There are many examples of game theory, such as the Cold War, which was between the United States and the Soviet Union, and their respective allies. In 1949, the Soviets ended the American monopoly on nuclear weapons. Now, with the mist of possible nuclear war, how do you think they formed war strategies? Did you guess it? It was game theory\!\!\!\! I won't go into detail because many other resources do (and do a better job than I could), so I’ll leave you with some in the **Resources & Further Reading** [^3] section.

## **How this visualization works**

In this simulation, you can choose from numerous strategies (see the list below). You also get to customize a few options. Here, I'll go into the significance of each.

Number of Rounds: As discussed above, game theory only becomes relevant when it involves multiple interactions/encounters or rounds in the Prisoner's Dilemma case.

> _Note: When simulating a tournament, it's important not to have a fixed \# of rounds. In Axelrod’s second tournament, the matches lasted around 200 rounds.
> If each match was guaranteed to be 200 rounds, then a strategy can use this knowledge to say “since it ends on 200, there's no need for me to cooperate in this round, since there's no consequence”. Thus, gaining an advantage, and since you know the 200th round you will defect well in the 199th round, you can also defect, and in the 198th round you can defect, and this continues on till round 1\. This is why it's important not to have a fixed number of rounds/interactions. For our visualization, this isn't used because it doesn’t exactly simulate a tournament. However, you can use a random number of rounds if so desired._

Noise: This is an important option for real-life applications. Think of it like miscommunication/mistakes; we know this happens all the time. One person says cooperate, but the other person misheard them as saying deect. Depending on the strategy, this could affect the results of a match.

_Speed:_ To help speed up the matches.

## **Strategies**

Strategies can be classified into two categories: naughty and nice. Naughty will defect first, and Nice will cooperate first. Here’s a list of the strategies included in this visualization.

| Name                   | Description                                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alternator             | Alternates between cooperating and defecting                                                                                                                                            |
| Always Cooperate       | Always chooses to cooperate                                                                                                                                                             |
| Always Defect          | Always chooses to defect                                                                                                                                                                |
| Grim                   | cooperates until the opponent defects and thereafter always defects. Sometimes also called Spiteful.                                                                                    |
| Hard Majority          | Defects on the first move and defects if the number of defections of the opponent is greater than or equal to the number of times they have cooperated. Otherwise will cooperate.       |
| Pavlov                 | Cooperates on the first move and defects only if both players do not agree on the previous move.                                                                                        |
| Periodic CCD           | Plays CCD periodically.                                                                                                                                                                 |
| Periodic DDC           | Plays DDC periodically.                                                                                                                                                                 |
| Random                 | Randomly plays “C” or “D” each round                                                                                                                                                    |
| Reverse Tit-for-Tat    | Defects first move, then plays the reverse of the opponent's move.                                                                                                                      |
| Soft Majority          | Begins by cooperating and cooperates as long as the number of times the opponent has cooperated is greater that or equal to the number of times it has defected. Otherwise will defect. |
| Suspicious Tit-for-Tat | Defect on the first move, then plays what the opponent played the previous move. Sometimes also called Mistrust                                                                         |
| Tit for Two Tats       | Cooperates unless defected against twice in a row.                                                                                                                                      |
| Tit-for-Tat            | Starts with “C”, then copies opponent’s last move                                                                                                                                       |
| Two Tits-for-Tat       | Defects twice after being defected against, otherwise cooperates.                                                                                                                       |

## **Resources & Further Reading**

- Check out Axelrod's seminal book on the 1980 tournament[^1]
- Stanford has a great overview of game theory[^2]
- Watch this excellent video on game theory and the Cold War[^3]
- For coders: try this Python library with 230+ strategies[^4]
- Play an interactive game about trust and cooperation[^5]

[^1]: Axelrod's Book on the 1980 Tournament.

    [A short introudction to the book](https://ee.stanford.edu/~hellman/Breakthrough/book/pdfs/axelrod.pdf)

    [The Evolution of Cooperation](https://www.goodreads.com/book/show/366821.The_Evolution_of_Cooperation)

[^2]: [Website by Stanford on Game Theory and Prisoner's Dilemma.](https://cs.stanford.edu/people/eroberts/courses/soco/projects/1998-99/game-theory/index.html)
[^3]:
    A VERY GOOD VIDEO on Game Theory and Prisoner's Dilemma. Talks about the use of game theory in the Cold War.

    Was a big inspiration for this website.

    [This game theory problem will change the way... By Veritasium](https://youtu.be/mScpHTIi-kM?si=QsxGZ82lAhnTP7yk)

[^4]:
    If you know how to code here's a python library for simulating Axelrod's Tournament. Has over 230 strategies even including ANN’s.

    Github: [https://github.com/Axelrod-Python/Axelrod/tree/dev](https://github.com/Axelrod-Python/Axelrod/tree/dev)

    Docs: [https://axelrod.readthedocs.io/en/latest/index.html](https://axelrod.readthedocs.io/en/latest/index.html)

[^5]: A very cool interactive game

    THE EVOLUTION OF TRUST: [https://ncase.me/trust/](https://ncase.me/trust/)
