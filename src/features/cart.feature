# language: es
@cart
Característica: Carrito de compras en Sauce Demo
  Como cliente de Sauce Demo
  Quiero agregar productos al carrito
  Para revisar lo que voy a comprar antes de pagar

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"

  @happyPath
  Escenario: Agregar un producto al carrito
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar "1"

  @happyPath
  Escenario: Ver los productos agregados en el carrito
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Y abre el carrito
    Entonces debería ver el producto "Sauce Labs Backpack" en el carrito
