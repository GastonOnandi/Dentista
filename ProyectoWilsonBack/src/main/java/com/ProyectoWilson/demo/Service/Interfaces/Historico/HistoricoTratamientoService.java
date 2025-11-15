package com.ProyectoWilson.demo.Service.Interfaces.Historico;


import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoTratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Tratamiento;

import java.util.List;

public interface HistoricoTratamientoService {
    void registrarAgregar (Tratamiento nuevo);
    void registrarModificacion (Tratamiento anterior, Tratamiento nuevo);
    List<HistoricoTratamientoResponseDTO> listarPorTratamiento(Tratamiento tratamiento);
}
