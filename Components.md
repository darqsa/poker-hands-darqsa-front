# Components List

## App

    Recibe: el token del usuario

    Muestra: Register componente
    Login componente o botón logout
    Lista usuarios solo si está logado

    Estado: logado o no logado

    Acción: Guarda/setea en local storage el token.

## REGISTER

    Recibe: nada

    Muestra: un formulario de registro con campos userName y Password y un botón registrarse

    Estado propio: ir actualizando los datos que va introduciendo usuario y al final volver al estado inicial.

    Acción: al clickar, enviar formulario de registro

## LOGIN

    Recibe: nada

    Muestra: un formulario con un botón para login.

    Estado: ir actualizando los datos que va introduciendo usuario y si todo ha ido bien, redirigir al perfil de usuario.

    Acción: al clickar el usuario, enviar el formulario y los datos del usuario logado al store.

## PROFILE

    Recibe:

    Muestra:

    Estado:

    Acción:

## HAND LIST

    Recibe props: lista de usuarios a renderizar

    Muestra: tantas cards como usuarios reciba

    Estado: listado muestra todos o solo amigos o enemigos

    Acción: al clickar en todos, amigos o enemigos, renderiza en función del estado

## HAND

    Recibe: por props el user a imprimir y si es amigo o enemigo del usuario

    Muestra: un user con su foto y nombre y un botón para cambiar el tipo de relación y un botón para ir a galeria.

    Estado: nada

    Acción: nada

## HAND DETAILS

    Recibe:

    Muestra:

    Estado:

    Acción:

## CREATE HAND

    Recibe:

    Muestra:

    Estado:

    Acción:
