package com.ProyectoWilson.demo.DTO.Response;

import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteConsideracionResponseDTO {
    private Long id;
    private TipoConsideracion tipo;
    private String detalle;
}
