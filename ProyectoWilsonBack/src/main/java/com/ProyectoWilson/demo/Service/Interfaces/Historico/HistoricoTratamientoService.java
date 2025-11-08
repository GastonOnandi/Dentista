package com.ProyectoWilson.demo.Service.Interfaces.Historico;


import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoTratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Tratamiento;

import java.util.List;

public interface HistoricoTratamientoService {
    Void registrarAgregar (Tratamiento nuevo);
    Void registrarModificacion (Tratamiento anterior, Tratamiento nuevo);
    List<HistoricoTratamientoResponseDTO> listarPorTratamiento(Tratamiento tratamiento);
}
