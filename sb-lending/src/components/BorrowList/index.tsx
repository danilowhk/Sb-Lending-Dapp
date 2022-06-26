import { Container } from "./styles";
import { useState } from "react";
interface BorrowListProps {
  onOpenBorrowModal: (contract: any) => void;
  onWETHData: any;
  onDaiData: any;
  onSBLData: any;
}

export function BorrowList({
  onOpenBorrowModal,
  onWETHData,
  onDaiData,
  onSBLData,
}: BorrowListProps) {
  return (
    <Container>
      <h1>Borrow Tokens List</h1>
      <span className="Title">
        <p>Name</p>
        <p>Price</p>
        <p>Balance</p>
        <p> </p>
      </span>
      <div>
        <p>{onWETHData.name}</p>
        <p>$ {onWETHData.price}</p>
        <p>{onWETHData.borrowBalance}</p>
        <button onClick={() => onOpenBorrowModal("WETH")}>
          Borrow / PayBack
        </button>
      </div>
      <div>
        <p>{onDaiData.name}</p>
        <p>$ {onDaiData.price}</p>
        <p>{onDaiData.borrowBalance}</p>
        <button onClick={() => onOpenBorrowModal("DAI")}>
          Borrow / PayBack
        </button>
      </div>
      <div>
        <p>{onSBLData.name}</p>
        <p>$ {onSBLData.price}</p>
        <p>{onSBLData.borrowBalance}</p>
        <button onClick={() => onOpenBorrowModal("SBL")}>
          Borrow / PayBack
        </button>
      </div>
    </Container>
  );
}
