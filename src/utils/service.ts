const serviceHelp = {
  formatNumber(number: number | string, type: string, region = "vi-Vn") {
    if (typeof number === "string") {
      number = Number(number);
    }
    switch (type) {
      case "decimal":
        return new Intl.NumberFormat(region, {
          style: "decimal",
        }).format(number);

      case "short":
        return new Intl.NumberFormat(region, {
          style: "decimal",
          notation: "compact",
          compactDisplay: "short",
        }).format(number);
      default:
        return new Intl.NumberFormat(region, {
          style: "decimal",
        }).format(number);
    }
  },
  formatNumberVN(count: number | string) {
    if (typeof count === "string") {
      count = Number(count);
    }

    const nf = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      notation: "compact",
      compactDisplay: "short",
    });

    return nf.format(count);
  },
  removeSpace(string: string) {
    return string.replace(/\s/g, "");
  },
};

export default serviceHelp;
