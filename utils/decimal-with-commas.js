export default function decimalWithCommas(num) {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const removeZeroAfterDecimal = (string) => {
    if (typeof string !== "string") return "Need a string!";
    if (string.indexOf(".") === -1) return string;
    const leftToDot = string.split(".")[0];
    const rightToDot = string.split(".")[1];
    if (Number(rightToDot) === 0) {
      return leftToDot;
    }
    return string;
  };
  const numWithDecimal = addDecimals(num);
  const numStringWithCommas = numWithDecimal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const zeroRemovedAfterDot = removeZeroAfterDecimal(numStringWithCommas);
  return zeroRemovedAfterDot;
}
