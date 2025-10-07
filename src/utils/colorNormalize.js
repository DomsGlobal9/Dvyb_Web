// utils/colorNormalize.js
import { COLORS } from '../constants/colors'; // or wherever COLORS lives

export const normalizeColorToCode = (val) => {
  if (!val) return '';
  if (typeof val === 'object') {
    if (val.code) return String(val.code).toLowerCase();
    if (val.name) return String(val.name).toLowerCase();
  }
  if (typeof val === 'string') {
    const s = val.trim();
    if (s.includes('_')) return s.split('_')[0].toLowerCase(); // "red_#FF0000"
    if (s.startsWith('#')) return hexToCode(s);                 // "#FF0000" -> "red"
    return s.toLowerCase();                                     // "red"
  }
  return '';
};

const hexToCode = (hex) => {
  const clean = (hex || '').toUpperCase();
  const hit = (COLORS || []).find(c => (c.value || '').toUpperCase() === clean);
  return hit ? hit.code.toLowerCase() : clean.toLowerCase();
};
