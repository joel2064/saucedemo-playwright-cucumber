# language: es
@login
Característica: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  Antecedentes:
    Dado que el usuario está en la página de login

  @smoke @happyPath
  Esquema del escenario: Inicio de sesión con credenciales válidas
    Cuando el usuario inicia sesión con el usuario "<usuario>" y la contraseña "<contraseña>"
    Entonces debería ver la página de productos

    Ejemplos:
      | usuario       | contraseña   |
      | standard_user | secret_sauce |

  @sadPath
  Esquema del escenario: Inicio de sesión con credenciales inválidas
    Cuando el usuario inicia sesión con el usuario "<usuario>" y la contraseña "<contraseña>"
    Entonces debería ver el mensaje de error "<mensaje>"

    Ejemplos:
      | usuario          | contraseña    | mensaje                                                                   |
      | locked_out_user  | secret_sauce  | Epic sadface: Sorry, this user has been locked out.                       |
      | usuario_invalido | clave_erronea | Epic sadface: Username and password do not match any user in this service |
      |                  | secret_sauce  | Epic sadface: Username is required                                         |
      | standard_user    |               | Epic sadface: Password is required                                         |