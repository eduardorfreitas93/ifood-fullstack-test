import StringMask from 'string-mask';

export const applyPriceMask = (value, prefix = '') => {
  let val = value;
  let priceMask = new StringMask('#,##0.00', { reverse: true });

  if (val) {
    if (typeof val === 'number') {
      val = val.toFixed(2);
    }
    val = val.replace(/\D/g, '');

    if (val.length < 5) {
      priceMask = new StringMask('##0,00', { reverse: true });
    } else {
      priceMask = new StringMask('#.##0,00', { reverse: true });
    }

    return `${prefix} ${(priceMask.apply(val) || 0)}`;
  }
  return `${prefix} 0,00`;
};

export const applyPhoneMask = (value) => {
  const formatter = new StringMask('+00 (00) 0000-0000');
  return formatter.apply(value);
};
