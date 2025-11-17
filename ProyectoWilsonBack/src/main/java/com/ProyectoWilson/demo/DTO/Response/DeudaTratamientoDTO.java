package com.ProyectoWilson.demo.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeudaTratamientoDTO {
    private String nombreTratamiento;
    private LocalDate fecha;
    private Long pago;
    private Long deuda;
    private Long total;
}
