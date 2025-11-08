package com.ProyectoWilson.demo.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TratamientoRequestDTO {
    private String Nombre;
    private Long costo;
}
