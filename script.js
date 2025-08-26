const userInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const statCells = document.querySelectorAll(".stats");

button.addEventListener("click", () => {
  const query = userInput.value.trim().toLowerCase();

  resetDisplay();

  if (query) {
    fetchCreature(query);
  } else {
    alert("Please enter a creature name or ID.");
  }
});

const fetchCreature = async (query) => {
  try {
    const res = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        alert("Creature not found");
        return;
      }
    }

    const data = await res.json();
    display(data);
  } catch (err) {
    console.error(err);
    resetDisplay();
  }
};

const display = (data) => {
  const name = document.getElementById("creature-name");
  const id = document.getElementById("creature-id");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");
  const types = document.getElementById("types");
  const specialty = document.getElementById("specialty");

  const output1 = document.getElementById("output_1");

  output1.style.visibility = "visible";

  name.textContent = data.name.toUpperCase();
  id.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  const specialty_name = data.special?.name ?? "N/A";
  const specialty_description =
    data.special?.description ?? "No description available.";

  specialty.innerHTML = `
    <strong class="special-name">${specialty_name}</strong><br>
    <span class="special-description">${specialty_description}</span>
  `;

  if (data.types && data.types.length > 0) {
    data.types.forEach((type) => {
      const span = document.createElement("span");
      span.textContent = type.name.toUpperCase();
      types.appendChild(span);
    });
  } else {
    types.textContent = "No types found.";
  }

  if (data.stats && data.stats.length > 0) {
    data.stats.forEach((stat) => {
      let statId = stat.name.toLowerCase();
      if (statId === 'special-attack') statId = 'special-attack';
      if (statId === 'special-defense') statId = 'special-defense';

      const statEl = document.getElementById(statId);
      if (statEl) {
        statEl.textContent = stat.base_stat;
      }
    });
  } else {
    statCells.forEach((cell) => {
        cell.textContent = "";
    });
  }
};

const resetDisplay = () => {
  document.getElementById("creature-name").textContent = "";
  document.getElementById("creature-id").textContent = "";
  document.getElementById("weight").textContent = "";
  document.getElementById("height").textContent = "";
  document.getElementById("types").innerHTML = "";
  document.getElementById("specialty").innerHTML = "";

  statCells.forEach((cell) => {
    cell.textContent = "";
  });

  document.getElementById("output_1").style.visibility = "hidden";
};

document.addEventListener("DOMContentLoaded", resetDisplay);
