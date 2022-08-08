import type { ClassificationOptions } from "./types";
import RoundRobinTournament from "./RoundRobinTournament";
import RoundRobinTeam from "./RoundRobinTeam";
import Match from "./Match";
import * as tieBreaks from "./TieBreaks";
import CustomTieBreaker from "./customTieBreaker";

const teams = [
  new RoundRobinTeam("Avaí", "brasileirao/avai.png", 1),
  new RoundRobinTeam("Flamengo", "brasileirao/flamengo.png", 2),
  new RoundRobinTeam("Botafogo", "brasileirao/botafogo.png", 3),
  new RoundRobinTeam("Fluminense", "brasileirao/fluminense.png", 4),
  new RoundRobinTeam("Atlético-GO", "brasileirao/atletico_go.png", 5),
  new RoundRobinTeam("Internacional", "brasileirao/internacional.png", 6),
  new RoundRobinTeam("Cuiabá", "brasileirao/cuiaba.png", 7),
  new RoundRobinTeam("Atlético-MG", "brasileirao/atletico_mg.png", 8),
  new RoundRobinTeam("São Paulo", "brasileirao/sao_paulo.png", 9),
  new RoundRobinTeam("Palmeiras", "brasileirao/palmeiras.png", 10),
  new RoundRobinTeam("Santos", "brasileirao/santos.png", 11),
  new RoundRobinTeam("Corinthians", "brasileirao/corinthians.png", 12),
  new RoundRobinTeam("Juventude", "brasileirao/juventude.png", 13),
  new RoundRobinTeam("Red Bull Bragantino", "brasileirao/red_bull_bragantino.png", 14),
  new RoundRobinTeam("Goiás", "brasileirao/goias.png", 15),
  new RoundRobinTeam("Athletico-PR", "brasileirao/athletico.png", 16),
  new RoundRobinTeam("Coritiba", "brasileirao/coritiba.png", 17),
  new RoundRobinTeam("América-MG", "brasileirao/america_mg.png", 18),
  new RoundRobinTeam("Fortaleza", "brasileirao/fortaleza.png", 19),
  new RoundRobinTeam("Ceará", "brasileirao/ceara.png", 20),
];

const classification: ClassificationOptions = {
  libertadores: { min: 2, max: 4 },
  playoffLibertadores: { min: 5, max: 6 },
  sulamericana: { min: 7, max: 12 },
  relegated: { min: 17, max: 20 },
};

const brasileirao = new RoundRobinTournament(teams, true, classification, [
  tieBreaks.wins,
  tieBreaks.goals,
  tieBreaks.goalDifference,
  tieBreaks.headToHead,
]);

const m = Match.getMatchesBetween(brasileirao.teams[0], brasileirao.teams[19]);

m[0].play(3, 1);

brasileirao.sortTeams();
console.log(brasileirao.teams);
