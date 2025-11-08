package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Entities.Turno;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TurnoService {
    TurnoResponseDTO agendarTurno(TurnoRequestDTO dto);
    Void reprogramarTurno(Long idTurno, TurnoRequestDTO dto);
    Void cancelarTurno(Long idTurno);
    List<Turno> obtenerPorCliente(Long idCliente);
    List<Turno> obtenerPorFecha(LocalDate fecha);
    boolean existeTurnoEnHorario(LocalDateTime fecha);

}
