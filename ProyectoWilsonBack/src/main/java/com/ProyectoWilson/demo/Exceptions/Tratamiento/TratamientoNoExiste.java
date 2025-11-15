package com.ProyectoWilson.demo.Exceptions.Tratamiento;

public class TratamientoNoExiste extends RuntimeException {
    public TratamientoNoExiste() {

      super("Tratamiento no existe");
    }
}
