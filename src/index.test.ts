import { strictEqual } from "node:assert";
import { test } from "node:test";
import { jaro, jaroWinkler } from ".";

test("jaro - completely different", () => strictEqual(jaro("abc", "xyz"), 0.0));
test("jaro - identical strings", () =>
  strictEqual(jaro("hello", "hello"), 1.0));
test("jaro - case insensitivity", () =>
  strictEqual(jaro("HeLLo", "hello"), 1.0));
test("jaro - dwayne vs duane", () =>
  strictEqual(jaro("dwayne", "duane"), 0.8222222222222223));
test("jaro - martha vs marhta", () =>
  strictEqual(jaro("martha", "marhta"), 0.9444444444444445));
test("jaro - dixon vs dicksonx", () =>
  strictEqual(jaro("dixon", "dicksonx"), 0.7666666666666666));

test("jaro - empty string edge cases", () => {
  strictEqual(jaro("", ""), 1.0);
  strictEqual(jaro("nonempty", ""), 0.0);
  strictEqual(jaro("", "nonempty"), 0.0);
});

test("jaroWinkler - completely different", () =>
  strictEqual(jaroWinkler("abc", "xyz"), 0.0));
test("jaroWinkler - identical strings", () =>
  strictEqual(jaroWinkler("hello", "hello"), 1.0));
test("jaroWinkler - case insensitivity", () =>
  strictEqual(jaroWinkler("TesT", "test"), 1.0));
test("jaroWinkler - dwayne vs duane", () =>
  strictEqual(jaroWinkler("dwayne", "duane"), 0.8400000000000001));
test("jaroWinkler - martha vs marhta", () =>
  strictEqual(jaroWinkler("martha", "marhta"), 0.9611111111111111));
test("jaroWinkler - dixon vs dicksonx", () =>
  strictEqual(jaroWinkler("dixon", "dicksonx"), 0.8133333333333332));

test("jaroWinkler - empty string edge cases", () => {
  strictEqual(jaroWinkler("", ""), 1.0);
  strictEqual(jaroWinkler("abc", ""), 0.0);
  strictEqual(jaroWinkler("", "abc"), 0.0);
});
