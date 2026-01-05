package com.ProyectoWilson.demo.DTO.Request;

import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteConsideracionRequestDTO {
    private TipoConsideracion tipo;
    private String detalle;
}
