import { defaultCurrency } from "@/App";
import { DsCoreApiClient } from "@/services/DsCoreApiClient";
import { useState, useEffect } from "react";
import { getCurrency } from "@/services/CacheService";

const api = new DsCoreApiClient();

function useMoney() {
  const [money, setMoney] = useState([]);

  useEffect(() => {
    async function fetchMoney() {
      const currency = await getCurrency(defaultCurrency);
      const response = await api.getMoney(currency.model.guid);
      setMoney(response);
    }
    fetchMoney();
  }, []);

  return money;
}

export default useMoney;
