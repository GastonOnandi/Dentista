package com.ProyectoWilson.demo.DTO.Response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public record TurnoResponseDTO(
        Long id,
        String nombreCliente,
        String tratamiento,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate fecha,
        @JsonFormat(pattern = "HH:mm")
        String horaInicio,
        @JsonFormat(pattern = "HH:mm")
        String horaFin
) {
}
