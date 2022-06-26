import { BorrowList } from "../BorrowList";
import { HealthFactor } from "../HealthFactor";
import { SoulBondsList } from "../SoulBondsList";

import { List } from "../Lists";
import { Summary } from "../Summary";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import sbLendingArtifact from "../../contracts/contracts/sbLending-V0.sol/sbLending.json";
import WETHArtifact from "../../contracts/contracts/WETH.sol/WETHToken.json";

interface DashboardProps {
  onOpenDepositModal: (contract: any) => void;
  onOpenBorrowModal: (contract: any) => void;
  provider: any;
  signer: any;
  WETHData: any;
  DaiData: any;
  SBLData: any;
  totalDepositBalance: any;
  totalBorrowBalance: any;
  maxCollateralFactor: any;
  currentHealthFactor: any;
}

export function Dashboard({
  onOpenDepositModal,
  onOpenBorrowModal,
  provider,
  WETHData,
  DaiData,
  SBLData,
  totalDepositBalance,
  totalBorrowBalance,
  maxCollateralFactor,
  currentHealthFactor,
}: DashboardProps) {
  useEffect(() => {}, [provider]);

  return (
    <Container>
      <Summary
        onTotalDepositBalance={totalDepositBalance}
        onTotalBorrowBalance={totalBorrowBalance}
      />
      <HealthFactor
        onMaxCollateralFactor={maxCollateralFactor}
        onCurrentHealthFactor={currentHealthFactor}
      />
      <SoulBondsList />
      <List
        onOpenDepositModal={onOpenDepositModal}
        onOpenBorrowModal={onOpenBorrowModal}
        onWETHData={WETHData}
        onDaiData={DaiData}
        onSBLData={SBLData}
      />
    </Container>
  );
}
