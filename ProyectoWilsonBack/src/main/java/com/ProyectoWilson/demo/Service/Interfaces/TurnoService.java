package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Entities.Turno;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TurnoService {
    TurnoResponseDTO agendarTurno(TurnoRequestDTO dto);
    void reprogramarTurno(Long idTurno, TurnoRequestDTO dto);
    void cancelarTurno(Long idTurno);
    List<TurnoResponseDTO> obtenerPorCliente(Long idCliente);
    List<TurnoResponseDTO> obtenerPorFechas(LocalDateTime fechaIni,LocalDateTime fechaFin);
    boolean existeTurnoEnHorario(LocalDateTime fecha);

}
