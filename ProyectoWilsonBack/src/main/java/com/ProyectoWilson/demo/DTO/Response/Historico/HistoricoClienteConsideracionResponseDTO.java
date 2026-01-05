package com.ProyectoWilson.demo.DTO.Response.Historico;

import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoClienteConsideracionResponseDTO {
    private Long id;
    private Long clienteConsideracionId;
    private LocalDate fechaModificacion;
    private String tipoModificacion;
    private TipoConsideracion tipoViejo;
    private String detalleViejo;
    private TipoConsideracion tipoNuevo;
    private String detalleNuevo;
}
