package com.ProyectoWilson.demo.DTO.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TurnoRequestDTO {
    private Long idCliente;
    public Long idTratamiento;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fecha;
    @JsonFormat(pattern = "HH:mm")
    private String horaInicio;
    @JsonFormat(pattern = "HH:mm")
    private String horaFin;
}
