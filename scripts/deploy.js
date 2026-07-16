const hre = require("hardhat");

async function main() {
  const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS || "0x88372c9c7Cf883A62eB3c46A79BC4b496AbCf822";
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    usdcAddress,
    "0xClientAddress",
    "0xContractorAddress",
    "0xSafeAddress",
    hre.ethers.parseUnits("18000", 6) // USDC has 6 decimals
  );
  await escrow.waitForDeployment();
  console.log("Escrow deployed to:", escrow.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
