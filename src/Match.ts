import type Team from "./Team";
import type { Goal, MatchProtocol, Score } from "./types";

class Match implements MatchProtocol {
  public readonly id: number;
  public readonly homeTeam: Team;
  public readonly awayTeam: Team;
  public isPlayed = false;
  public score: Score = { homeTeam: null, awayTeam: null };

  constructor(homeTeam: Team, awayTeam: Team, id: number) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  //* seria mais interessante mandar um score inteiro talvez...
  play(homeGoals: Goal, awayGoals: Goal): void {
    const { homeTeam, awayTeam } = this.score;
    if (homeTeam === homeGoals && awayTeam === awayGoals) return;

    this.score.homeTeam = homeGoals;
    this.score.awayTeam = awayGoals;

    if (homeGoals === null || awayGoals === null) {
      this.isPlayed = false;
    } else {
      this.isPlayed = true;
    }

    this.homeTeam.playMatch(this);
    this.awayTeam.playMatch(this);
  }

  getTeamScore(team: Team): number[] {
    const { homeTeam: homeTeamGoals, awayTeam: awayTeamGoals } = this.score;
    const selfScore = this.homeTeam.name === team.name ? (homeTeamGoals as number) : (awayTeamGoals as number);
    const otherScore = this.homeTeam.name === team.name ? (awayTeamGoals as number) : (homeTeamGoals as number);
    return [selfScore, otherScore];
  }

  //? não sei se é uma boa ideia instanciar um objeto da classe dentro da própria classe (mesmo sendo estático????)
  static create(teams: Team[], id: number): MatchProtocol {
    const homeTeam = teams[0];
    const visitingTeam = teams[1];

    const match = new Match(homeTeam, visitingTeam, id);

    homeTeam.addMatch(match);
    visitingTeam.addMatch(match);

    return match;
  }

  static getMatchesBetween(team1: Team, team2: Team): MatchProtocol[] {
    return team1.matches.filter((match: MatchProtocol) => {
      const { homeTeam, awayTeam } = match;
      return (homeTeam === team1 && awayTeam === team2) || (homeTeam === team2 && awayTeam === team1);
    });
  }

  static headToHeadGoals(team1: Team, team2: Team): [number, number] {
    const matches = Match.getMatchesBetween(team1, team2);
    const team1Goals = team1.goalsInMatches(matches);
    const team2Goals = team2.goalsInMatches(matches);
    return [team1Goals, team2Goals];
  }
}

export default Match;
