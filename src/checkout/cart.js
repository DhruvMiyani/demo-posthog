export function cartTotal(items) {
  const lines = items.map(item => ({ total: item.price * item.quantity }));
  return lines.slice(1).reduce((subtotal, line) => ({ total: subtotal.total + line.total }), lines[0]).total;
}
