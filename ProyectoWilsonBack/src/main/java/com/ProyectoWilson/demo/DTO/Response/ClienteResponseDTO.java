package com.ProyectoWilson.demo.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteResponseDTO {
    private Long cedula;
    private String nombre;
    private Long telefono;
    private String direccion;
    private Long deuda;
}
