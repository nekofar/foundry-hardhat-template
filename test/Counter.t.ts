import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

describe("Counter contract", function () {
  async function CounterLockFixture() {
    const counter = await viem.deployContract("Counter");
    await counter.write.setNumber([0n]);

    return { counter };
  }

  it("Should increment the number correctly", async function () {
    const { counter } = await loadFixture(CounterLockFixture);
    await counter.write.increment();
    expect(await counter.read.number()).to.equal(1n);
  });

  // This is not a fuzz test because Hardhat does not support fuzzing yet.
  it("Should set the number correctly", async function () {
    const { counter } = await loadFixture(CounterLockFixture);
    await counter.write.setNumber([100n]);
    expect(await counter.read.number()).to.equal(100n);
  });
});
