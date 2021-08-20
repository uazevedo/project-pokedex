/* 
The colors, icons and most of the assets were based/obtained throuhg Figma, Link:
based on https://www.figma.com/file/THLxZSlOoUYMZrjFg0Kl1M/Pok%C3%A9dex?node-id=218%3A4648
*/

// BUTTONS COLORS
export const buttonColors = new Map();
buttonColors.set('primary','#EA5D60');
buttonColors.set('secondary','#f2f2f2');

export const heightColors = new Map();
heightColors.set(  'short','#FFC5E6');
heightColors.set( 'medium','#AEBFD7');
heightColors.set(   'tall','#AAACB8');

export const weightColors = new Map();
weightColors.set(  'light','#99CD7C');
weightColors.set( 'normal','#57B2DC');
weightColors.set(  'heavy','#5A92A5');

// BACKGROUND ELEMENTAL COLORS
export const backgroundTypeColors = new Map();
backgroundTypeColors.set(      'bug','#8BD674');
backgroundTypeColors.set(     'dark','#6F6E78');
backgroundTypeColors.set(   'dragon','#7383B9');
backgroundTypeColors.set( 'electric','#F2CB55');

backgroundTypeColors.set(    'fairy','#EBA8C3');
backgroundTypeColors.set( 'fighting','#EB4971');
backgroundTypeColors.set(     'fire','#FFA756');
backgroundTypeColors.set(   'flying','#83A2E3');

backgroundTypeColors.set(    'ghost','#8571BE');
backgroundTypeColors.set(    'grass','#8BBE8A');
backgroundTypeColors.set(   'ground','#F78551');
backgroundTypeColors.set(      'ice','#91D8DF');

backgroundTypeColors.set(   'normal','#85B9C4');
backgroundTypeColors.set(   'poison','#9F6E97');
backgroundTypeColors.set(  'psychic','#FF6568');
backgroundTypeColors.set(     'rock','#D4C294');

backgroundTypeColors.set(    'steel','#4C91B2');
backgroundTypeColors.set(    'water','#58ABF6');

// ELEMETAL COLORS (WATER, FIRE, BUG...)
export const elementTypeColors = new Map();
elementTypeColors.set(      'bug','#8CB230');
elementTypeColors.set(     'dark','#58575F');
elementTypeColors.set(   'dragon','#0F6AC0'); //'#106AC0;
elementTypeColors.set( 'electric','#EED535');

elementTypeColors.set(    'fairy','#ED6EC7');
elementTypeColors.set( 'fighting','#D04164');
elementTypeColors.set(     'fire','#FD7D24');
elementTypeColors.set(   'flying','#748FC9');

elementTypeColors.set(    'ghost','#556AAE');
elementTypeColors.set(    'grass','#62B957');
elementTypeColors.set(   'ground','#DD7748');
elementTypeColors.set(      'ice','#61CEC0');

elementTypeColors.set(   'normal','#9DA0AA');
elementTypeColors.set(   'poison','#A551CC');
elementTypeColors.set(  'psychic','#EA5D60');
elementTypeColors.set(     'rock','#BAAB82');

elementTypeColors.set(    'steel','#417D9A');
elementTypeColors.set(    'water','#4A90DA');

export default { elementTypeColors, backgroundTypeColors,weightColors,heightColors }