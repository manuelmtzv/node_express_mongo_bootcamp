module.exports = function replaceTemplate(template, element) {
  let output = template.replace(/{%PRODUCTNAME%}/g, element.productName);
  output = output.replace(/{%IMAGE%}/g, element.image);
  output = output.replace(/{%PRICE%}/g, element.price);
  output = output.replace(/{%FROM%}/g, element.from);
  output = output.replace(/{%NUTRIENTDFS%}/g, element.nutrients);
  output = output.replace(/{%QUANTITY%}/g, element.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, element.description);
  output = output.replace(/{%ID%}/g, element.id);

  if (!element.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};
