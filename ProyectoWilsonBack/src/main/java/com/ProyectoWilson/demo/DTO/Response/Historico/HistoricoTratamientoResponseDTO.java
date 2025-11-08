package com.ProyectoWilson.demo.DTO.Response.Historico;

import com.ProyectoWilson.demo.Entities.Tratamiento;
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
public class HistoricoTratamientoResponseDTO {

    private Long id;
    private Long idTratamiento;
    private LocalDate fechaModificacion;
    private String tipoModificacion;

    private String nombreViejo;
    private Long costoViejo;
    private String nombreNuevo;
    private Long costoNuevo;

}
