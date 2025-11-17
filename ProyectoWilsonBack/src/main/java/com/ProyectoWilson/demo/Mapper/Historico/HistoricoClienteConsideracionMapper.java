package com.ProyectoWilson.demo.Mapper.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteConsideracionResponseDTO;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoClienteConsideracion;
import org.springframework.stereotype.Component;

@Component
public class HistoricoClienteConsideracionMapper {
    public HistoricoClienteConsideracionResponseDTO toResponseDTO(HistoricoClienteConsideracion entidad){
        HistoricoClienteConsideracionResponseDTO dto = new HistoricoClienteConsideracionResponseDTO();
        dto.setClienteConsideracionId(entidad.getClienteConsideracion().getId());
        dto.setTipoModificacion(entidad.getTipoModificacion());
        dto.setFechaModificacion(entidad.getFechaModificacion());
        dto.setDetalleNuevo(entidad.getDetalleNuevo());
        dto.setDetalleViejo(entidad.getDetalleViejo());
        dto.setTipoNuevo(entidad.getTipoNuevo());
        dto.setTipoViejo(entidad.getTipoViejo());
        return dto;
    }
}
