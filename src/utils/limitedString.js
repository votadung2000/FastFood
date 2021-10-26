export default (str = '', limited) => {
  if (str) {
    let arr = str.split('');
    if (arr.length > limited) {
      return arr.slice(0, limited).join('') + '..';
    }
    return arr;
  }
  return '';
};
