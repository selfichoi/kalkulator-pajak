export const formatCurrency = (n) => {
  return "Rp\u00A0" + Math.round(n).toLocaleString("id-ID");
};

export const calculateTax = (rawPrice, qty, method, taxRule) => {
  if (!rawPrice || rawPrice <= 0 || !taxRule) return null;

  const tpn = taxRule.ppn / 100;
  const tpm = taxRule.ppnbm / 100;
  const dp = taxRule.dpp / 100;
  const ht = rawPrice * qty;

  let pk, dpp, ppn, ppnbm, tot;

  if (method === "excl") {
    pk = ht;
    dpp = ht * dp;
    ppn = dpp * tpn;
    ppnbm = dpp * tpm;
    tot = ht + ppn + ppnbm;
  } else {
    const f = 1 + tpn + tpm;
    pk = ht / f;
    dpp = pk * dp;
    ppn = dpp * tpn;
    ppnbm = dpp * tpm;
    tot = ht;
  }

  const p = [];
  if (taxRule.dpp !== 100) p.push(`DPP ${taxRule.dpp}% = ${formatCurrency(dpp)}`);
  p.push(`PPN ${taxRule.ppn}% = ${formatCurrency(ppn)}`);
  if (taxRule.ppnbm > 0) p.push(`PPnBM ${taxRule.ppnbm}% = ${formatCurrency(ppnbm)}`);
  if (taxRule.ppn === 0 && taxRule.ppnbm === 0) p.push("Transaksi ini bebas PPN & PPnBM");

  return {
    pk,
    dpp,
    ppn,
    ppnbm,
    total: tot,
    notes: p.join("   ·   "),
    taxRule
  };
};