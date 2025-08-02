"use client";

import { organizationService } from "@/lib/services/FectchTransactionsByOrganization";
import React from "react";
import useSWR from "swr";

export default function useTransactions() {
  const swrKey = "organization-transactions";

  const {
    data: transactions,
    error: organizationError,
    isLoading: organizationLoading,
  } = useSWR(
    swrKey,
    () => organizationService.organizationData(), // Wrap in arrow function
    {
      // Optional: Add SWR configuration
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 8;

  // Add safety checks for transactions
  const totalPages = transactions
    ? Math.ceil(transactions.length / transactionsPerPage)
    : 0;
  const currentTransactions = transactions
    ? transactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage,
      )
    : [];

  const sent = transactions
    ? transactions.filter(
        (transaction) =>
          transaction.transactionType === "Disbursement Transaction",
      )
    : [];

  const deposit = transactions
    ? transactions.filter(
        (transaction) =>
          transaction.transactionType === "Collection Transaction",
      )
    : [];

  const success = transactions
    ? transactions.filter((transaction) => transaction.status === "SUCCESSFUL")
    : [];

  const failed = transactions
    ? transactions.filter((transaction) => transaction.status !== "SUCCESSFUL")
    : [];

  return {
    transactions,
    organizationError,
    organizationLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    currentTransactions,
    sent,
    deposit,
    success,
    failed,
  };
}
