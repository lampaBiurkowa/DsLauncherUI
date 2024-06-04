import { defaultCurrency } from "@/App";
import { DsCoreApiClient } from "@/services/DsCoreApiClient";
import { useState, useEffect } from "react";
import { CurrenciesCache } from "@/services/CacheService";

const api = new DsCoreApiClient();

function useMoney() {
  const [money, setMoney] = useState([]);

  useEffect(() => {
    async function fetchMoney() {
      const currency = await CurrenciesCache.getById(defaultCurrency);
      const response = await api.getMoney(currency.model.guid);
      setMoney(response);
    }
    fetchMoney();
  }, []);

  return money;
}

export default useMoney;
