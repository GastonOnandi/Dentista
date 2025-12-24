package com.ProyectoWilson.demo.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteConsideracionRequestDTO {
    private String tipo;
    private String detalle;
}
