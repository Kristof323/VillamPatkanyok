import { describe, expect, test } from "vitest";
import { ElectricRat } from "./ElectricRat";

describe("ElectricRat osztály", () => {
  test("helyesen létrehoz egy villámpatkányt", () => {
    const rat = new ElectricRat("Zizegő", 15, 80);

    expect(rat.name).toBe("Zizegő");
    expect(rat.atk).toBe(15);
    expect(rat.hp).toBe(80);
  });

  test("eltávolítja a név eleji és végi szóközöket", () => {
    const rat = new ElectricRat("  Zizegő  ", 15, 80);

    expect(rat.name).toBe("Zizegő");
  });

  test("hibát dob üres név esetén", () => {
    expect(() => {
      new ElectricRat("", 15, 80);
    }).toThrow("A név nem lehet üres!");
  });

  test("hibát dob csak szóközökből álló név esetén", () => {
    expect(() => {
      new ElectricRat("   ", 15, 80);
    }).toThrow("A név nem lehet üres!");
  });

  test("hibát dob nem pozitív ATK esetén", () => {
    expect(() => {
      new ElectricRat("Zizegő", 0, 80);
    }).toThrow();

    expect(() => {
      new ElectricRat("Zizegő", -5, 80);
    }).toThrow();
  });

  test("hibát dob nem pozitív HP esetén", () => {
    expect(() => {
      new ElectricRat("Zizegő", 15, 0);
    }).toThrow();

    expect(() => {
      new ElectricRat("Zizegő", 15, -10);
    }).toThrow();
  });

  test("hibát dob tizedes ATK esetén", () => {
    expect(() => {
      new ElectricRat("Zizegő", 15.5, 80);
    }).toThrow();
  });

  test("hibát dob tizedes HP esetén", () => {
    expect(() => {
      new ElectricRat("Zizegő", 15, 80.5);
    }).toThrow();
  });

  test("helyesen készít CSV sort", () => {
    const rat = new ElectricRat("Zizegő", 15, 80);

    expect(rat.toCSV()).toBe("Zizegő;15;80");
  });
});