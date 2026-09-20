# language: es
@checkout
Característica: Proceso de compra en Sauce Demo
  Como cliente de Sauce Demo
  Quiero completar el proceso de compra
  Para adquirir los productos que agregué al carrito

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"

  @happyPath
  Escenario: Completar una compra hasta la confirmación
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Y abre el carrito
    Y procede al pago
    Y completa el formulario con nombre "Joel", apellido "Ramos" y código postal "15001"
    Y finaliza la compra
    Entonces debería ver la confirmación de la compra
