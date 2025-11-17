package com.ProyectoWilson.demo.Exceptions.ClienteTratamiento;

public class MontoMayorQueDeudaException extends RuntimeException {
    public MontoMayorQueDeudaException() {
        super("El monto ingresado es mayor que la deuda a pagar");
    }
}
