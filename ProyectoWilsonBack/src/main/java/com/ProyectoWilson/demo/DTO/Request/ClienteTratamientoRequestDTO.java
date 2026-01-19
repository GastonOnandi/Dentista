package com.ProyectoWilson.demo.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteTratamientoRequestDTO {
    private Long idCliente;
    private Long idTratamiento;
    private Long debe;
    private Long pago;
    private LocalDate fecha;
    private String estado;
}
