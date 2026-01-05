package com.ProyectoWilson.demo.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fecha;
    private String horaInicio;
    private String horaFin;
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente")
    private Cliente clienteAsociado;

    @ManyToOne
    @JoinColumn(name = "id_tratamiento")
    private Tratamiento tratamientoAsociado;
}
