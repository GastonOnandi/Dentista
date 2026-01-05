package com.ProyectoWilson.demo.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TratamientoResponseDTO {
    private Long id;
    private String nombre;
    private Long costo;
}
