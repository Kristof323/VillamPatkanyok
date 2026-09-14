import { describe, expect, test } from "vitest";
import { ElectricRat } from "./ElectricRat";

describe("ElectricRat", () => {
  test("helyesen létrehoz egy villámpatkányt", () => {
    const rat = new ElectricRat("bomastic", 15, 80);

    expect(rat.name).toBe("bombastic");
    expect(rat.atk).toBe(15);
    expect(rat.hp).toBe(80);
  });

  test("hibát dob üres név esetén", () => {
    expect(() => {
      new ElectricRat("", 15, 80);
    }).toThrow();
  });

  test("hibát dob csak szóközökből álló név esetén", () => {
    expect(() => {
      new ElectricRat("   ", 15, 80);
    }).toThrow();
  });

  test("hibát dob nem pozitív attack esetén", () => {
    expect(() => {
      new ElectricRat("bombastic", 0, 80);
    }).toThrow();

    expect(() => {
      new ElectricRat("bombastic", -2, 80);
    }).toThrow();
  });

  test("hibát dob nem pozitív hp esetén", () => {
    expect(() => {
      new ElectricRat("bombastic", 15, 0);
    }).toThrow();

    expect(() => {
      new ElectricRat("bombastic", 15, -10);
    }).toThrow();
  });

  test("hibát dob tizedes számok esetén", () => {
    expect(() => {
      new ElectricRat("bombastic", 15.5, 80);
    }).toThrow();

    expect(() => {
      new ElectricRat("bombastic", 15, 80.5);
    }).toThrow();
  });

  test("helyesen alakítja CSV sorrá az adatokat", () => {
    const rat = new ElectricRat("bombastic", 15, 80);

    expect(rat.toCSV()).toBe("bombastic;15;80");
  });
});