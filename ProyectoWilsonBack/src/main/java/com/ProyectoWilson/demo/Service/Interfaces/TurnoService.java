package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.RangoDeFechas;
import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnosPorDia;

import java.time.LocalDateTime;
import java.util.List;

public interface TurnoService {
    TurnoResponseDTO agendarTurno(TurnoRequestDTO dto);
    void reprogramarTurno(Long idTurno, TurnoRequestDTO dto);
    void cancelarTurno(Long idTurno);
    List<TurnoResponseDTO> obtenerPorCliente(Long idCliente);
    List<TurnoResponseDTO> obtenerPorFechas(RangoDeFechas rangoDeFechas);
    boolean existeTurnoEnHorario(LocalDateTime fecha);
    List<TurnosPorDia> obtenerTurnosAgrupados();
}
