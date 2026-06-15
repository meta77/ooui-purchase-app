export function generateNextId(existingIds, prefix, defaultIdNumber = 1, padding = 0) {
  let nextIdNumber = defaultIdNumber;
  if (existingIds && existingIds.length > 0) {
    const numericIds = existingIds.map(id => {
      const parts = id.split('-');
      return parseInt(parts[1], 10);
    }).filter(n => !isNaN(n));
    
    if (numericIds.length > 0) {
      nextIdNumber = Math.max(...numericIds) + 1;
    }
  }
  
  const idNumberStr = padding > 0 ? String(nextIdNumber).padStart(padding, '0') : String(nextIdNumber);
  return `${prefix}${idNumberStr}`;
}
