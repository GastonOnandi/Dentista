package com.ProyectoWilson.demo.Exceptions.ClienteTratamiento;

public class ClienteTratamientoNoExiste extends RuntimeException {
    public ClienteTratamientoNoExiste() {

        super("Cliente Tratamiento no existe");
    }
}
