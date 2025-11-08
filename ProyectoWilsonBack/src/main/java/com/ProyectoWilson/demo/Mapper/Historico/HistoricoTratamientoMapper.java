package com.ProyectoWilson.demo.Mapper.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoTratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoTratamiento;

public class HistoricoTratamientoMapper {
    public HistoricoTratamientoResponseDTO toResponseDTO (HistoricoTratamiento hTratamiento){
        HistoricoTratamientoResponseDTO dto = new HistoricoTratamientoResponseDTO();
        dto.setId(hTratamiento.getId());
        dto.setIdTratamiento(hTratamiento.getTratamiento().getId());
        dto.setFechaModificacion(hTratamiento.getFechaModificacion());
        dto.setTipoModificacion(hTratamiento.getTipoModificacion());
        dto.setCostoViejo(hTratamiento.getCostoViejo());
        dto.setCostoNuevo(hTratamiento.getCostoNuevo());
        dto.setNombreViejo(hTratamiento.getNombreViejo());
        dto.setNombreNuevo(hTratamiento.getNombreNuevo());
        return dto;
    }
}
