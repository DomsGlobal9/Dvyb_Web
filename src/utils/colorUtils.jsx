export const colorUtils = {
  // Parse color from "colorName_#hexCode" format
  parseColor: (colorString) => {
    if (!colorString) return { name: '', hex: '#000000' };
    
    if (colorString.includes('_')) {
      const [name, hex] = colorString.split('_');
      return { name: name.toLowerCase(), hex: hex || '#000000' };
    }
    
    // If it's just a color name, find the hex code
    const colorObj = FILTER_OPTIONS.selectedColors.find(
      c => c.name.toLowerCase() === colorString.toLowerCase()
    );
    
    return colorObj || { name: colorString.toLowerCase(), hex: '#000000' };
  },

  // Get hex code from color name
  getHexFromName: (colorName) => {
    const colorObj = FILTER_OPTIONS.selectedColors.find(
      c => c.name.toLowerCase() === colorName.toLowerCase()
    );
    return colorObj?.hex || '#000000';
  },

  // Format color for storage (name_#hex)
  formatColor: (name, hex) => {
    return `${name.toLowerCase()}_${hex}`;
  }
};