export class ElectricRat {
  public name: string;
  
  public atk: number;

  public hp: number;

  constructor(name: string, atk: number, hp: number) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("A név nem lehet üres!");
    }

    if (!Number.isInteger(atk) || atk <= 0) {
      throw new Error("Az ATK értékének pozitív egésznek kell lennie!");
    }



    if (!Number.isInteger(hp) || hp <= 0) {
      throw new Error("A HP értékének pozitív egésznek kell lennie!"); 

    }

    this.name = name.trim();
    this.atk = atk;
    this.hp = hp;
  }

  public toCSV(): string {
    return `${this.name};${this.atk};${this.hp}`;
      }
}