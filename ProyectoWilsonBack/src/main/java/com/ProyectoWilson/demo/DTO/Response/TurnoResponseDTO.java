package com.ProyectoWilson.demo.DTO.Response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public record TurnoResponseDTO(
        Long id,
        String nombreCliente,
        String tratamiento,
        @JsonFormat(pattern = "dd-MM-yyyy")
        LocalDate fecha,
        @JsonFormat(pattern = "HH:mm")
        LocalTime horaInicio,
        @JsonFormat(pattern = "HH:mm")
        LocalTime horaFin
) {
}
