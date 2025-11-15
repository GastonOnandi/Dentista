package com.ProyectoWilson.demo.Exceptions.Cliente;

public class ClienteYaExisteException extends RuntimeException {
    public ClienteYaExisteException() {

        super("Cliente ya existe");
    }
}
