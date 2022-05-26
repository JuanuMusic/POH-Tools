import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import networkUtils from "../utils/networkUtils";

describe("POH Dummy", function () {
  let signers: SignerWithAddress[];
  before(async () => {
    signers = await ethers.getSigners();
  })

  it("happy path - should correctly register an account that is not registered", async function () {
    const POHDummy = await ethers.getContractFactory("POHDummy");
    const pohDummy = await POHDummy.deploy();
    await pohDummy.deployed();

    let registeredHuman = signers[0];
    let notRegisteredHuman = signers[1];
    // Expires in 1 hour
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
    const expirationTimestamp = Math.round(expirationDate.getTime() / 1000);

    // Register human
    await pohDummy.connect(registeredHuman).register(expirationTimestamp);

    // Verify is registered
    expect(await pohDummy.isRegistered(registeredHuman.address)).to.eq(true);
    // Verify not registered user is not registered
    expect(await pohDummy.isRegistered(notRegisteredHuman.address)).to.eq(false);
  });

  it("fail path - should not register an account when passing an expiration date in the past", async function () {
    const POHDummy = await ethers.getContractFactory("POHDummy");
    const pohDummy = await POHDummy.deploy();
    await pohDummy.deployed();

    // Expiration date 10 secs in the past
    const expirationDate = new Date(Date.now() - 10 * 1000);
    const expirationTimestamp = Math.round(expirationDate.getTime() / 1000);

    // Register human
    await expect(pohDummy.connect(signers[0]).register(expirationTimestamp))
      .to.be.revertedWith("registry can't expire in the past");
  });

  it("happy path - should correctly unregister an account when requested", async function () {
    const POHDummy = await ethers.getContractFactory("POHDummy");
    const pohDummy = await POHDummy.deploy();
    await pohDummy.deployed();

    let registeredHuman = signers[0];

    // Expires in 1 hour
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
    const expirationTimestamp = Math.round(expirationDate.getTime() / 1000);
    // Register
    await pohDummy.connect(registeredHuman).register(expirationTimestamp);

    // Unregister
    await pohDummy.connect(registeredHuman).unregister();

    // Should not be registered
    expect(await pohDummy.isRegistered(registeredHuman.address)).to.eq(false);
  });

  it("happy path - should correctly unregister after expiration has passed", async function () {
    const POHDummy = await ethers.getContractFactory("POHDummy");
    const pohDummy = await POHDummy.deploy();
    await pohDummy.deployed();

    let registeredHuman = signers[0];

    // Expires in 30 minutes
    const expirationDate = new Date(Date.now() + 30 * 60 * 1000);
    const expirationTimestamp = Math.round(expirationDate.getTime() / 1000);
    // Register
    await pohDummy.connect(registeredHuman).register(expirationTimestamp);

    // Move forward 1 hour
    await networkUtils.timeForward(60 * 60, network);

    // Should not be registered
    expect(await pohDummy.isRegistered(registeredHuman.address)).to.eq(false);
  });
});
