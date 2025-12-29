package com.ProyectoWilson.demo.DTO.Response;

import java.util.List;

public record TurnosPorDia(String dia,
                           List<TurnoItemDTO> turnos) {
}
