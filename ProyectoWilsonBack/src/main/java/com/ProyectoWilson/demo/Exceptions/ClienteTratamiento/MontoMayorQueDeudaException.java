package com.ProyectoWilson.demo.Exceptions.ClienteTratamiento;

public class MontoMayorQueDeudaException extends RuntimeException {
  public MontoMayorQueDeudaException(String message) {
    super(message);
  }
}
