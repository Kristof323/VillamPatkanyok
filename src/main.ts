import "./style.css";
import { ElectricRat } from "./ElectricRat";

const rats: ElectricRat[] = [];

const form = document.querySelector<HTMLFormElement>("#rat-form");

const nameInput = document.querySelector<HTMLInputElement>("#rat-name");

const errorMessage = document.querySelector<HTMLParagraphElement>(
  "#error-message",
);

const ratsContainer = document.querySelector<HTMLDivElement>(
  "#rats-container",
);

const emptyMessage = document.querySelector<HTMLParagraphElement>(
  "#empty-message",
);

const showCsvButton = document.querySelector<HTMLButtonElement>(
  "#show-csv-button",
);

const downloadCsvButton = document.querySelector<HTMLButtonElement>(
  "#download-csv-button",
);

const csvOutput = document.querySelector<HTMLTextAreaElement>(
  "#csv-output",
);

if (
  !form ||
  !nameInput ||
  !errorMessage ||
  !ratsContainer ||
  !emptyMessage ||
  !showCsvButton ||
  !downloadCsvButton ||
  !csvOutput
) {
  throw new Error("Nem található minden szükséges HTML elem.");
}

const validRatsContainer = ratsContainer;
const validEmptyMessage = emptyMessage;

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderRats(): void {
  validRatsContainer.innerHTML = "";

  validEmptyMessage.hidden = rats.length > 0;

  for (const rat of rats) {
    const card = document.createElement("article");
    card.className = "rat-card";

    const title = document.createElement("h3");
    title.textContent = rat.name;

    const attack = document.createElement("p");
    attack.className = "stat-row";
    attack.innerHTML = `<span>ATK</span><strong>${rat.atk}</strong>`;

    const health = document.createElement("p");
    health.className = "stat-row";
    health.innerHTML = `<span>HP</span><strong>${rat.hp}</strong>`;

    card.append(title, attack, health);
    validRatsContainer.appendChild(card);
  }
}

function createCsv(): string {
  const header = "name;atk;hp";
  const rows = rats.map((rat) => rat.toCSV());

  return [header, ...rows].join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const rat = new ElectricRat(
      nameInput.value,
      randomInteger(10, 20),
      randomInteger(50, 100),
    );

    rats.push(rat);

    nameInput.value = "";
    errorMessage.textContent = "";

    renderRats();
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.textContent = error.message;
    } else {
      errorMessage.textContent = "Ismeretlen hiba történt!";
    }
  }
});

showCsvButton.addEventListener("click", () => {
  csvOutput.value = createCsv();
});

downloadCsvButton.addEventListener("click", () => {
  const csvContent = createCsv();

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "electric-rats.csv";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
});