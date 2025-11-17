package com.ProyectoWilson.demo.Exceptions.ClienteConsideracion;

public class ClienteConsideracionNoExiste extends RuntimeException {
  public ClienteConsideracionNoExiste() {

    super("ClienteConsideracion no existe");
  }
}
