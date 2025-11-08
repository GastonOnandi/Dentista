package com.ProyectoWilson.demo.Exceptions.Cliente;

public class ClienteNoExiste extends RuntimeException {
    public ClienteNoExiste() {

        super("Cliente no existe");
    }
}
