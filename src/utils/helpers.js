function chartGenerator() {
  var letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  var numero = (Math.random() * 15).toFixed(0);
  return letras[numero];
}

export function colorHEX() {
  var coolor = "";
  for (var i = 0; i < 6; i++) {
    coolor = coolor + chartGenerator();
  }
  return "#" + coolor;
}
