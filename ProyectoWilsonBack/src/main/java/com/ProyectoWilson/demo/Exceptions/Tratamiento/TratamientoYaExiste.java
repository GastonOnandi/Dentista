package com.ProyectoWilson.demo.Exceptions.Tratamiento;

public class TratamientoYaExiste extends RuntimeException {
    public TratamientoYaExiste() {
        super("El tratamiento ya existe");
    }
}
