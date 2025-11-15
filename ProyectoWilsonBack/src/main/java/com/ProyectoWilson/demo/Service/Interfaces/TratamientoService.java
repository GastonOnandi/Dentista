package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.DTO.Request.TratamientoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TratamientoResponseDTO;
import java.util.List;

public interface TratamientoService {
    TratamientoResponseDTO registrarTratamiento(TratamientoRequestDTO dto);
    List<TratamientoResponseDTO> listarTratamientos();
    void actualizarTratamiento(Long id, TratamientoRequestDTO dto);
}
