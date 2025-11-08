package com.ProyectoWilson.demo.DTO.Response.Historico;

import com.ProyectoWilson.demo.Entities.Cliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoClienteResponseDTO {
    private Long id;
    private Long cedula;
    private LocalDate fechaModificacion;
    private String tipoModificacion;

    private String nombreViejo;
    private Long telefonoViejo;
    private String direccionVieja;
    private String nombreNuevo;
    private Long telefonoNuevo;
    private String direccionNueva;
}
