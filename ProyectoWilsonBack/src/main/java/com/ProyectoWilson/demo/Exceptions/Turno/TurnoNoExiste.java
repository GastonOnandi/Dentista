package com.ProyectoWilson.demo.Exceptions.Turno;

public class TurnoNoExiste extends RuntimeException {
    public TurnoNoExiste() {

        super("Turno no existe");
    }
}
