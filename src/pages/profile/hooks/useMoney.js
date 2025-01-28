import { DsNdibcoinApiClient } from "@/services/DsNdibcoinApiClient";
import { useState, useEffect } from "react";

const api = new DsNdibcoinApiClient();

function useMoney() {
  const [money, setMoney] = useState([]);

  useEffect(() => {
    async function fetchMoney() {
      const response = await api.getMoney();
      setMoney(response);
    }
    fetchMoney();
  }, []);

  return money;
}

export default useMoney;
