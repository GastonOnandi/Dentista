package com.ProyectoWilson.demo.DTO.Response;

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
    private String tipo;
    private String detalle;
}
