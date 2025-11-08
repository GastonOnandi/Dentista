package com.ProyectoWilson.demo.Mapper.Historico;

import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoClienteResponseDTO;
import com.ProyectoWilson.demo.DTO.Response.Historico.HistoricoTratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Historico.HistoricoCliente;
import org.springframework.stereotype.Component;

@Component
public class HistoricoClienteMapper {
    public HistoricoClienteResponseDTO toResponseDTO (HistoricoCliente hCliente){
        HistoricoClienteResponseDTO dto = new HistoricoClienteResponseDTO();
        dto.setCedula(hCliente.getCliente().getCedula());
        dto.setId(hCliente.getId());
        dto.setFechaModificacion(hCliente.getFechaModificacion());
        dto.setTipoModificacion(hCliente.getTipoModificacion());
        dto.setNombreViejo(hCliente.getNombreViejo());
        dto.setDireccionVieja(hCliente.getDireccionVieja());
        dto.setTelefonoViejo(hCliente.getTelefonoViejo());
        dto.setNombreNuevo(hCliente.getNombreNuevo());
        dto.setDireccionNueva(hCliente.getDireccionNueva());
        dto.setTelefonoNuevo(hCliente.getTelefonoNuevo());
        return dto;
    }
}
