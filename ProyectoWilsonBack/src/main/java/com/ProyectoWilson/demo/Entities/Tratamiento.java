package com.ProyectoWilson.demo.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tratamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Nombre;
    private Long costo;
    @OneToMany(mappedBy = "tratamiento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClienteTratamiento> clienteTratamientos = new ArrayList<>();
}
