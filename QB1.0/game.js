/* ===========================
   QUIZBLAST — GAME LOGIC
   =========================== */

// ── Constants ───────────────────────────────────────────
const TEAM_HEX = ['#ef4444','#3b82f6','#22c55e','#f97316'];

const SPECIALS = [
  { icon:'⚡', label:'+2 Bonus',     desc:'Lucky tile! +2 bonus points awarded.',          effect:'bonus2' },
  { icon:'🎁', label:'+1 Bonus',     desc:'Free point! +1 bonus point awarded.',            effect:'bonus1' },
  { icon:'💣', label:'Lose a Point', desc:'Bad luck! You lose 1 point.',                    effect:'minus1' },
  { icon:'🔄', label:'Steal!',       desc:'Steal 1 point from the team with most points!', effect:'steal'  },
  { icon:'💥', label:'Lose 2!',      desc:'Ouch! You lose 2 points.',                       effect:'minus2' },
  { icon:'🌟', label:'+3 Jackpot!',  desc:'Jackpot! +3 bonus points awarded.',              effect:'bonus3' },
];

const SPECIAL_CHANCE = 0.18;

const PALETTE = [
  '#7c3aed','#4f46e5','#0891b2','#0f766e',
  '#16a34a','#d97706','#db2777','#dc2626',
];

let state = {
  teams:          [],
  questions:      [],
  tiles:          [],
  currentTeam:    0,
  totalTiles:     16,
  currentTileIdx: null,
};

let numTeams = 2;
let numTiles = 16;

// ── Setup ───────────────────────────────────────────────
document.querySelectorAll('.count-btn[data-count]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.count-btn[data-count]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    numTeams = parseInt(btn.dataset.count);
    renderTeamNameInputs();
  });
});

document.querySelectorAll('.count-btn[data-tiles]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.count-btn[data-tiles]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    numTiles = parseInt(btn.dataset.tiles);
  });
});

function renderTeamNameInputs() {
  const container = document.getElementById('team-names-container');
  container.innerHTML = '';
  for (let i = 0; i < numTeams; i++) {
    const row   = document.createElement('div');
    row.className = 'team-name-row';
    const dot   = document.createElement('div');
    dot.className = 'team-dot';
    dot.style.background = TEAM_HEX[i];
    const input = document.createElement('input');
    input.type        = 'text';
    input.placeholder = `Team ${i + 1} name`;
    input.value       = `Team ${i + 1}`;
    input.dataset.teamIdx = i;
    row.appendChild(dot);
    row.appendChild(input);
    container.appendChild(row);
  }
}
renderTeamNameInputs();

document.getElementById('start-btn').addEventListener('click', startGame);

// ── Game Init ───────────────────────────────────────────
function startGame() {
  state.teams = [];
  for (let i = 0; i < numTeams; i++) {
    const input = document.querySelector(`input[data-team-idx="${i}"]`);
    state.teams.push({
      name:   input ? input.value.trim() || `Team ${i+1}` : `Team ${i+1}`,
      score:  0,
      streak: 0,
    });
  }

  // Randomise questions fresh each game
  state.questions   = [...dataICT].sort(() => Math.random() - 0.5);
  state.totalTiles  = numTiles;
  state.currentTeam = 0;

  // Build tiles numbered 1..N; some are special (effect hidden until clicked)
  state.tiles = [];
  let qCursor = 0;
  for (let i = 0; i < numTiles; i++) {
    const isSpecial = Math.random() < SPECIAL_CHANCE;
    state.tiles.push({
      num:        i + 1,
      used:       false,
      specialIdx: isSpecial ? Math.floor(Math.random() * SPECIALS.length) : null,
      questionIdx: isSpecial ? null : qCursor++,
    });
  }

  showScreen('game-screen');
  renderScoreboard();
  renderBoard();
  updateTurnIndicator();
}

// ── Screens ─────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Scoreboard ──────────────────────────────────────────
function renderScoreboard() {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '';
  state.teams.forEach((team, i) => {
    const card = document.createElement('div');
    card.className = 'score-card' + (i === state.currentTeam ? ' active-turn' : '');
    card.style.background = `linear-gradient(135deg, ${TEAM_HEX[i]}33, ${TEAM_HEX[i]}11)`;
    card.style.border     = `2px solid ${TEAM_HEX[i]}66`;
    const streak = team.streak >= 2 ? `🔥 ${team.streak} streak` : '';
    card.innerHTML = `
      <div class="score-team-name" style="color:${TEAM_HEX[i]}">${team.name}</div>
      <div class="score-points">${team.score}</div>
      ${streak ? `<div class="score-streak">${streak}</div>` : ''}
    `;
    sb.appendChild(card);
  });
}

// ── Board ───────────────────────────────────────────────
function tileColor(num) {
  return PALETTE[(num - 1) % PALETTE.length];
}

function renderBoard() {
  const board = document.getElementById('board');
  const cols  = Math.sqrt(state.totalTiles);
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.innerHTML = '';

  state.tiles.forEach((tile, i) => {
    const btn = document.createElement('button');
    if (tile.used) {
      btn.className   = 'tile used';
      btn.textContent = '✓';
    } else {
      const col         = tileColor(tile.num);
      btn.className     = 'tile';
      btn.style.background = `linear-gradient(135deg, ${col}, ${col}bb)`;
      btn.style.boxShadow  = `0 4px 16px ${col}66`;
      btn.textContent   = tile.num;   // just the number — special status hidden
      btn.addEventListener('click', () => selectTile(i));
    }
    board.appendChild(btn);
  });
}

function updateTurnIndicator() {
  const team = state.teams[state.currentTeam];
  const el   = document.getElementById('turn-team');
  el.textContent = team.name;
  el.style.color = TEAM_HEX[state.currentTeam];
}

// ── Tile Selection ──────────────────────────────────────
function selectTile(idx) {
  state.currentTileIdx = idx;
  const tile = state.tiles[idx];
  if (tile.specialIdx !== null) {
    triggerSpecial(tile.specialIdx, idx);
  } else {
    openQuestionModal(idx);
  }
}

// ── Question Modal ──────────────────────────────────────
function openQuestionModal(idx) {
  const tile  = state.tiles[idx];
  const entry = state.questions[tile.questionIdx % state.questions.length];
  const team  = state.teams[state.currentTeam];

  document.getElementById('modal-tile-num').textContent = `Tile ${tile.num} · ${team.name}`;

  document.getElementById('modal-question').innerHTML =
    `<span class="q-term">${entry.acronym}</span>` +
    (entry.hint ? `<span class="q-hint">💡 ${entry.hint}</span>` : '');

  document.getElementById('modal-answer').innerHTML =
    `<div class="ans-full">${
      entry.isAcronym
        ? `<strong>${entry.acronym}</strong> = ${entry.full}`
        : `<strong>${entry.full}</strong>`
    }</div>` +
    `<div class="ans-detail">${entry.answer}</div>`;

  document.getElementById('modal-answer').classList.add('hidden');
  document.getElementById('reveal-btn').classList.remove('hidden');
  document.getElementById('correct-btn').classList.add('hidden');
  document.getElementById('wrong-btn').classList.add('hidden');
  document.getElementById('q-modal').classList.remove('hidden');
}

document.getElementById('reveal-btn').addEventListener('click', () => {
  document.getElementById('modal-answer').classList.remove('hidden');
  document.getElementById('reveal-btn').classList.add('hidden');
  document.getElementById('correct-btn').classList.remove('hidden');
  document.getElementById('wrong-btn').classList.remove('hidden');
});

document.getElementById('correct-btn').addEventListener('click', () => {
  const team = state.teams[state.currentTeam];
  team.score++;
  team.streak++;
  if (team.streak > 0 && team.streak % 3 === 0) team.score++; // streak bonus
  state.tiles[state.currentTileIdx].used = true;
  document.getElementById('q-modal').classList.add('hidden');
  advanceTurn();
});

document.getElementById('wrong-btn').addEventListener('click', () => {
  state.teams[state.currentTeam].streak = 0;
  state.tiles[state.currentTileIdx].used = true;
  document.getElementById('q-modal').classList.add('hidden');
  advanceTurn();
});

// ── Special Tiles ───────────────────────────────────────
function triggerSpecial(specialIdx, tileIdx) {
  const sp   = SPECIALS[specialIdx];
  const team = state.teams[state.currentTeam];

  switch (sp.effect) {
    case 'bonus1': team.score = Math.max(0, team.score + 1); break;
    case 'bonus2': team.score = Math.max(0, team.score + 2); break;
    case 'bonus3': team.score = Math.max(0, team.score + 3); break;
    case 'minus1': team.score = Math.max(0, team.score - 1); break;
    case 'minus2': team.score = Math.max(0, team.score - 2); break;
    case 'steal': {
      const others = state.teams.filter((_, i) => i !== state.currentTeam);
      const leader = [...others].sort((a,b) => b.score - a.score)[0];
      if (leader && leader.score > 0) { leader.score--; team.score++; }
      break;
    }
  }

  document.getElementById('powerup-icon').textContent  = sp.icon;
  document.getElementById('powerup-title').textContent = sp.label;
  document.getElementById('powerup-desc').textContent  = sp.desc;
  document.getElementById('powerup-modal').classList.remove('hidden');

  document.getElementById('powerup-ok-btn').onclick = () => {
    document.getElementById('powerup-modal').classList.add('hidden');
    state.tiles[tileIdx].used = true;
    advanceTurn();
  };
}

// ── Turn Advance ────────────────────────────────────────
function advanceTurn() {
  if (state.tiles.every(t => t.used)) { showWinner(); return; }
  state.currentTeam = (state.currentTeam + 1) % state.teams.length;
  renderScoreboard();
  renderBoard();
  updateTurnIndicator();
}

// ── Winner ──────────────────────────────────────────────
function showWinner() {
  const sorted = [...state.teams].sort((a,b) => b.score - a.score);
  const winner = sorted[0];
  const isTie  = sorted[1] && sorted[1].score === winner.score;

  document.getElementById('winner-title').textContent =
    isTie ? "It's a Tie! 🤝" : `${winner.name} Wins! 🎉`;

  const finalScores = document.getElementById('final-scores');
  finalScores.innerHTML = '';
  sorted.forEach((team, i) => {
    const row     = document.createElement('div');
    row.className = 'final-row' + (i === 0 ? ' winner-row' : '');
    const teamIdx = state.teams.indexOf(team);
    row.innerHTML = `
      <span style="color:${TEAM_HEX[teamIdx]};font-weight:800">${i===0&&!isTie?'🏆 ':''}${team.name}</span>
      <span class="final-pts" style="color:${TEAM_HEX[teamIdx]}">${team.score} pts</span>
    `;
    finalScores.appendChild(row);
  });

  launchConfetti();
  showScreen('winner-screen');
}

function launchConfetti() {
  const wrap   = document.getElementById('confetti');
  wrap.innerHTML = '';
  const colors = ['#f9a826','#e94560','#22d3a5','#a855f7','#3b82f6','#ef4444'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('div');
    c.className = 'confetto';
    c.style.cssText = `
      left:${Math.random()*100}%;top:${Math.random()*-60}px;
      background:${colors[i%colors.length]};
      width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;
      animation-duration:${1.5+Math.random()*2}s;
      animation-delay:${Math.random()*1.5}s;
      border-radius:${Math.random()>.5?'50%':'2px'};
    `;
    wrap.appendChild(c);
  }
}

document.getElementById('play-again-btn').addEventListener('click', () => {
  showScreen('setup-screen');
});
