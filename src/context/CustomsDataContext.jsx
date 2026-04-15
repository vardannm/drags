import React, { createContext, useContext, useMemo, useState } from 'react';

const CustomsDataContext = createContext(null);

const initialDriver = {
  fullName: '',
  passportId: '',
  nationality: '',
  vehiclePlate: '',
  licenseNumber: '',
  transportCompany: '',
};

const initialScaling = {
  grossWeight: 0,
  tareWeight: 0,
  manualNetWeight: null,
};

const initialCargoItem = () => ({
  id: crypto.randomUUID(),
  description: '',
  hsCode: '',
  quantity: 1,
  value: 0,
  origin: '',
});

const initialTaxState = {
  dutyRate: 5,
  vatRate: 12,
  additionalFee: 0,
  paid: false,
};

export function CustomsDataProvider({ children }) {
  const [driverData, setDriverData] = useState(initialDriver);
  const [scalingData, setScalingData] = useState(initialScaling);
  const [cargoItems, setCargoItems] = useState([initialCargoItem()]);
  const [taxConfig, setTaxConfig] = useState(initialTaxState);

  const netWeight = useMemo(() => {
    const gross = Number(scalingData.grossWeight) || 0;
    const tare = Number(scalingData.tareWeight) || 0;
    if (scalingData.manualNetWeight !== null && scalingData.manualNetWeight !== '') {
      return Math.max(0, Number(scalingData.manualNetWeight) || 0);
    }
    return Math.max(0, gross - tare);
  }, [scalingData]);

  const cargoTotals = useMemo(() => {
    const totalValue = cargoItems.reduce((sum, item) => {
      const value = Number(item.value) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + value * qty;
    }, 0);

    const totalQuantity = cargoItems.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0
    );

    return { totalValue, totalQuantity };
  }, [cargoItems]);

  const taxes = useMemo(() => {
    const duty = (cargoTotals.totalValue * (Number(taxConfig.dutyRate) || 0)) / 100;
    const vatBase = cargoTotals.totalValue + duty;
    const vat = (vatBase * (Number(taxConfig.vatRate) || 0)) / 100;
    const fee = Number(taxConfig.additionalFee) || 0;

    // Optional net-weight adjustment for heavy cargo.
    const weightSurcharge = netWeight > 20000 ? (netWeight - 20000) * 0.01 : 0;

    return {
      duty,
      vat,
      fee,
      weightSurcharge,
      total: duty + vat + fee + weightSurcharge,
    };
  }, [cargoTotals.totalValue, taxConfig, netWeight]);

  const snapshot = useMemo(
    () => ({
      scalingData,
      driverData,
      cargoItems,
      taxCalculations: {
        ...taxConfig,
        ...taxes,
        netWeight,
        totalCargoValue: cargoTotals.totalValue,
        totalCargoQuantity: cargoTotals.totalQuantity,
      },
    }),
    [scalingData, driverData, cargoItems, taxConfig, taxes, netWeight, cargoTotals]
  );

  const restoreSnapshot = (payload) => {
    if (!payload) return;
    setScalingData(payload.scalingData || initialScaling);
    setDriverData(payload.driverData || initialDriver);
    setCargoItems(payload.cargoItems?.length ? payload.cargoItems : [initialCargoItem()]);

    const taxPayload = payload.taxCalculations || {};
    setTaxConfig((prev) => ({
      ...prev,
      dutyRate: taxPayload.dutyRate ?? prev.dutyRate,
      vatRate: taxPayload.vatRate ?? prev.vatRate,
      additionalFee: taxPayload.additionalFee ?? prev.additionalFee,
      paid: taxPayload.paid ?? false,
    }));
  };

  const value = {
    driverData,
    setDriverData,
    scalingData,
    setScalingData,
    cargoItems,
    setCargoItems,
    taxConfig,
    setTaxConfig,
    netWeight,
    cargoTotals,
    taxes,
    snapshot,
    restoreSnapshot,
    createCargoItem: initialCargoItem,
  };

  return <CustomsDataContext.Provider value={value}>{children}</CustomsDataContext.Provider>;
}

export function useCustomsData() {
  const context = useContext(CustomsDataContext);
  if (!context) {
    throw new Error('useCustomsData must be used within CustomsDataProvider');
  }
  return context;
}
