import { ElectricRat } from "./ElectricRat";
import "./style.css";

// patkanyok listaja
const patkanyok: ElectricRat[] = [];





document.addEventListener("DOMContentLoaded", () => {
  // html elemek
  const ujpatkanyForm =
    document.getElementById("rat-form") as HTMLFormElement | null;

  const nevMezo =
    document.getElementById("rat-name") as HTMLInputElement | null;

  const patkanyLista =
    document.getElementById("rats-container") as HTMLDivElement | null;

  const uresUzenet =
    document.getElementById("empty-message") as HTMLParagraphElement | null;

  const hibaUzenet =
    document.getElementById("error-message") as HTMLParagraphElement | null;

  const exportMegjeleniteseGomb =
    document.getElementById("show-csv-button") as HTMLButtonElement | null;

  const exportLetolteseGomb =
    document.getElementById("download-csv-button") as HTMLButtonElement | null;

  const exportMezo =
    document.getElementById("csv-output") as HTMLTextAreaElement | null;

  if (
    !ujpatkanyForm ||
    !nevMezo ||
    !patkanyLista ||
    !uresUzenet ||
    !hibaUzenet ||
    !exportMegjeleniteseGomb ||
    !exportLetolteseGomb ||
    !exportMezo
  ) {
    throw new Error("Nem található minden szükséges HTML elem.");
  }

  // veletlen szam generator
  function veletlenEgesz(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // patkanykartyak megjelenitese

  function patkanyokMegjelenitese(): void {
    patkanyLista!.innerHTML = "";

    uresUzenet!.hidden = patkanyok.length !== 0;



    for (const patkany of patkanyok) {
      const ujKartya = document.createElement("article");
      ujKartya.className = "rat-card";

      const cim = document.createElement("h3");
      cim.textContent = patkany.name;

      const tamadas = document.createElement("p");
      tamadas.className = "stat-row";
      tamadas.innerHTML = `<span>ATK</span> ${patkany.atk}`;

      const eletero = document.createElement("p");
      eletero.className = "stat-row";
      eletero.innerHTML = `<span>HP</span> ${patkany.hp}`;

      ujKartya.append(cim, tamadas, eletero);
      patkanyLista!.appendChild(ujKartya);
    }


  }

  // csv create
  function csvLetrehozasa(): string {
    const fejléc = "name;atk;hp";

    const sorok = patkanyok.map((patkany) => {
      return patkany.toCSV();
    });

    return [fejléc, ...sorok].join("\n");
  }

  // uj patkany
  ujpatkanyForm.addEventListener("submit", (esemeny) => {
    esemeny.preventDefault();

    const adatok = new FormData(ujpatkanyForm);
    const nev = adatok.get("name")?.toString() ?? "";

    try {
      const ujPatkany = new ElectricRat(
        nev,
        veletlenEgesz(10, 20),
        veletlenEgesz(50, 100),
      );





      patkanyok.push(ujPatkany);

      ujpatkanyForm.reset();
      hibaUzenet.textContent = "";

      patkanyokMegjelenitese();
    } catch (hiba) {
      if (hiba instanceof Error) {
        hibaUzenet.textContent = hiba.message;
      } else {
        hibaUzenet.textContent = "Ismeretlen hiba történt!";
      }
    }
  });

  // csv megjelenitese
  exportMegjeleniteseGomb.addEventListener("click", () => {
    exportMezo.value = csvLetrehozasa();
  });




  // csv letoltese
  exportLetolteseGomb.addEventListener("click", () => {
    const csvTartalom = csvLetrehozasa();

    exportMezo.value = csvTartalom;

    const csvFajl = new Blob([csvTartalom], {
      type: "text/csv;charset=utf-8;",
    });

    const fajlUrl = URL.createObjectURL(csvFajl);
    const letoltoLink = document.createElement("a");

    letoltoLink.href = fajlUrl;
    letoltoLink.download = "villampatkanyok.csv";

    document.body.appendChild(letoltoLink);

    letoltoLink.click();

    letoltoLink.remove();

    URL.revokeObjectURL(fajlUrl);
  });
});