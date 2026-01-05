package com.ProyectoWilson.demo.Entities;

import com.ProyectoWilson.demo.Entities.Historico.HistoricoTratamiento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tratamiento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tratamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "costo")
    private Long costo;

    @OneToMany(mappedBy = "tratamiento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClienteTratamiento> clienteTratamientos = new ArrayList<>();

    @OneToMany(mappedBy = "tratamientoAsociado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Turno> turnos = new ArrayList<>();

    @OneToMany(mappedBy = "tratamiento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HistoricoTratamiento> historico = new ArrayList<>();
}
